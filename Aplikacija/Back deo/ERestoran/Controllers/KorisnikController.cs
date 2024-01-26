using Helpers;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text.RegularExpressions;

namespace Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KorisnikController : ControllerBase
    {
        public ERestoranContext Context { get; set; }

        public KorisnikController(ERestoranContext context)
        {
            Context = context;
        }

        [HttpGet("PrikaziSveKorisnike")]
        public async Task<ActionResult> PrikaziSveKorisnike()
            => Ok(await Context.Korisnici.ToListAsync());

        [HttpGet("PrikaziKorisnika/{korisnikID}")]
        public async Task<ActionResult> PrikaziKorisnika(int korisnikID)
        {
            var k = await Context.Korisnici.FindAsync(korisnikID);
            if (k == null) return NotFound($"Korisnik sa ID-jem {korisnikID} nije pronadjen!");

            return Ok(await Context.Korisnici
                .Where(k => k.ID == korisnikID)
                .SingleOrDefaultAsync()
            );
        }

        [HttpPost("Registracija")]
        public async Task<ActionResult> Registracija([FromBody]Korisnik k)
        {
            try
            {
                if (await ProveriUsernameAsync(k.Username!))
                    throw new Exception("Username vec postoji!");

                if (await ProveriEmailAsync(k.Username!))
                    throw new Exception("Email vec postoji!");

                var pass = CheckPasswordStrength(k.Password!);
                if (!string.IsNullOrEmpty(pass))
                    throw new Exception(pass);

                k.Password = PasswordHasher.HashPassword(k.Password!);
                k.Tip = "Korisnik";
                k.Token = ""; //za sada je prazno

                await Context.Korisnici.AddAsync(k);
                await Context.SaveChangesAsync();
                return Ok(k);
            }
            catch (Exception ex)
            {
                return BadRequest("Greska: " + ex.Message);
            }
        }

        [HttpPost("Autentikacija")]
        public async Task<ActionResult> Autentikacija([FromBody]Korisnik k)
        {
            try
            {
                var korisnik = await Context.Korisnici
                    .FirstOrDefaultAsync(x => x.Username == k.Username);
                if (korisnik == null) return NotFound("Korisnik nije pronadjen!");

                if (!PasswordHasher.VerifyPassword(k.Password!, korisnik.Password!))
                {
                    return BadRequest("Pogresna lozinka!");
                }

                var newAccessToken = CreateJwtToken(korisnik);
                var newRefreshToken = CreateJwtRefreshToken();

                korisnik.Token = newAccessToken;
                korisnik.RefreshToken = newRefreshToken;
                korisnik.RefreshTokenExpiryDate = DateTime.Now.AddDays(5);

                await Context.SaveChangesAsync();

                return Ok(new TokenApiDto()
                {
                    AccessToken = newAccessToken,
                    RefreshToken = newRefreshToken
                });
            }
            catch (Exception ex)
            {
                return BadRequest("Greska: " + ex.Message);
            }
        }

        [HttpPost("Osvezi")]
        public async Task<ActionResult> OsveziToken(TokenApiDto tokenApi)
        {
            try
            {
                if (tokenApi == null) throw new Exception("Zahtev klijenta nije validan!");

                string accessToken = tokenApi.AccessToken!;
                string refreshToken = tokenApi.RefreshToken!;
                var principal = GetPrincipalFromExpiredToken(accessToken);
                var username = principal.Identity!.Name;

                var korisnik = await Context.Korisnici.FirstOrDefaultAsync(k => k.Username == username);
                if (korisnik == null || korisnik.RefreshToken != refreshToken || korisnik.RefreshTokenExpiryDate <= DateTime.Now)
                    throw new Exception("Zahtev nije validan!");

                var newAccessToken = CreateJwtToken(korisnik);
                var newRefreshToken = CreateJwtRefreshToken();

                korisnik.RefreshToken = newRefreshToken;

                await Context.SaveChangesAsync();

                return Ok(new TokenApiDto()
                {
                    AccessToken = newAccessToken,
                    RefreshToken = newRefreshToken
                });
            }
            catch (Exception ex)
            {
                return BadRequest("Greska: " + ex.Message);
            }
        }

        [HttpPut("IzmeniKorisnika/{korisnikID}")]
        public async Task<ActionResult> IzmeniKorisnika(int korisnikID, [FromBody]Korisnik k)
        {
            try
            {
                var user = await Context.Korisnici.FindAsync(korisnikID);
                if (user == null) return NotFound($"Korisnik sa ID-jem {korisnikID} nije pronadjen!");

                if (!string.IsNullOrWhiteSpace(k.Ime) && 
                    !string.IsNullOrWhiteSpace(k.Prezime) && 
                    !string.IsNullOrWhiteSpace(k.Email) && 
                    !string.IsNullOrWhiteSpace(k.Username) && 
                    !string.IsNullOrWhiteSpace(k.Password) && 
                    !string.IsNullOrWhiteSpace(k.Telefon)
                )
                {
                    user.Ime = k.Ime;
                    user.Prezime = k.Prezime;
                    user.Email = k.Email;
                    user.Username = k.Username;
                    user.Telefon = k.Telefon;
                    if (user.Password != k.Password) {
                        user.Password = PasswordHasher.HashPassword(k.Password!);
                    }
                    // else {
                    //     user.Password = k.Password;
                    // }

                    Context.Korisnici.Update(user);
                    await Context.SaveChangesAsync();
                    return Ok(user);
                }
                else
                {
                    throw new Exception("Neispravan unos!");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Greska: " + ex.Message);
            }
        }
        
        

        private async Task<bool> ProveriUsernameAsync(string username)
            => await Context.Korisnici.AnyAsync(x => x.Username == username);
        private async Task<bool> ProveriEmailAsync(string email)
            => await Context.Korisnici.AnyAsync(x => x.Email == email);
        private string CheckPasswordStrength(string password)
        {
            StringBuilder sb = new StringBuilder();
            if (password.Length < 8)
            {
                sb.Append("Sifra mora imati bar 8 karaktera!" + Environment.NewLine);
            }
            if (!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]") && Regex.IsMatch(password, "[0-9]")))
            {
                sb.Append("Sifra mora imati mala i velika slova i brojeve!" + Environment.NewLine);
            }
            // if (!(Regex.IsMatch(password, "[<,>,@,!,#,$,%,^,&,*,()),_,+,\\[,\\],{,},?,:,;,|,',\\,.,/,~,`,-,=]")))
            // {
            //     sb.Append("Sifra mora imati specijani karakter!" + Environment.NewLine);
            // }
            return sb.ToString();
        }
        private string CreateJwtToken(Korisnik k)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes("topsecretkeythatisveryverysecret");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.SerialNumber, k.ID!.ToString()),
                new Claim(ClaimTypes.Role, k.Tip!),
                new Claim(ClaimTypes.Name, k.Username)
            });
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddSeconds(10),
                SigningCredentials = credentials
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

        private string CreateJwtRefreshToken()
        {
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var refreshToken = Convert.ToBase64String(tokenBytes);

            var tokenInUser = Context.Korisnici.Any(x => x.RefreshToken == refreshToken);

            if (tokenInUser)
            {
                return CreateJwtRefreshToken();
            }
            return refreshToken;
        }
        
        private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var key = Encoding.ASCII.GetBytes("topsecretkeythatisveryverysecret");
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateLifetime = false
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Token nije validan!");
            }
            return principal;
        }
    }
}