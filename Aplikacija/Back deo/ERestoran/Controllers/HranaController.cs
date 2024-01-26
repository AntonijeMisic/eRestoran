namespace Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HranaController : ControllerBase
    {
        public ERestoranContext Context { get; set; }

        public HranaController(ERestoranContext context)
        {
            Context = context;
        }

        [HttpGet("PrikaziSvuHranu")]
        public async Task<ActionResult> PrikaziSvuHranu()
            => Ok(await Context.Hrana
                .Include(h => h.Ocene!)
                .ThenInclude(o => o.Korisnik)
                .Include(h => h.Komentari!)
                .ThenInclude(k => k.Korisnik)
                .ToListAsync());



        [HttpGet("PrikaziMeni/{restoranID}")]
        public async Task<ActionResult> PrikaziMeni(int restoranID)
        {
            var r = await Context.Restorani.FindAsync(restoranID);
            if (r == null) return NotFound($"Restoran sa ID-jem {restoranID} nije pronadjen!");

            var h = await Context.Hrana
                .Where(h => h.Restoran!.ID == restoranID)
                .Include(h => h.Ocene!)
                .ThenInclude(o => o.Korisnik)
                .Include(h => h.Komentari!)
                .ThenInclude(k => k.Korisnik)
                .ToListAsync();
            
            if (h.Count == 0) return NotFound("Meni je prazan!");
            return Ok(h);
        }

        [HttpGet("PrikaziHranu/{hranaID}")]
        public async Task<ActionResult> PrikaziHranu(int hranaID)
        {
            var h = await Context.Hrana.FindAsync(hranaID);
            if (h == null) return NotFound($"Hrana sa ID-jem {hranaID} nije pronadjena!");
            
            return Ok(await Context.Hrana
                .Where(h => h.ID == hranaID)
                .Include(h => h.Ocene!)
                .ThenInclude(o => o.Korisnik)
                .Include(h => h.Komentari!)
                .ThenInclude(k => k.Korisnik)
                .SingleOrDefaultAsync()
            );
        }

        [HttpPost("UnesiHranu/{restoranID}")]
        public async Task<ActionResult> UnesiHranu([FromBody]Hrana h, int restoranID, int korisnikID)
        {
            try
            {
                var r = await Context.Restorani.FindAsync(restoranID);
                if (r == null) return NotFound($"Restoran sa ID-jem {restoranID} nije pronadjen!");
                var k = await Context.Korisnici.FindAsync(korisnikID);
                if (k == null) return NotFound($"Korisnik sa ID-jem {korisnikID} nije pronadjen!");

                if (k.Tip == "Admin")
                {
                    if (!string.IsNullOrWhiteSpace(h.Naziv) && !string.IsNullOrWhiteSpace(h.JedinicaMere) && h.Cena >= 0 && h.Kolicina > 0)
                    {
                        h.Restoran = r;

                        await Context.Hrana.AddAsync(h);
                        await Context.SaveChangesAsync();
                        return Ok(h);
                    }
                    else
                    {
                        throw new Exception("Neispravan unos!");
                    }
                }
                else
                {
                    return Unauthorized("Ne mozete uneti hranu!");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Greska: " + ex.Message);
            }
        }

        [HttpPut("IzmeniHranu/{hranaID}")]
        public async Task<ActionResult> IzmeniHranu([FromBody]Hrana h, int hranaID, int korisnikID)
        {
            try
            {
                var v = await Context.Hrana.FindAsync(hranaID);
                if (v == null) return NotFound($"Hrana sa ID-jem {hranaID} nije pronadjena!");
                var k = await Context.Korisnici.FindAsync(korisnikID);
                if (k == null) return NotFound($"Korisnik sa ID-jem {korisnikID} nije pronadjen!");

                if (k.Tip == "Admin")
                {
                    if (!string.IsNullOrWhiteSpace(h.Naziv) && !string.IsNullOrWhiteSpace(h.JedinicaMere) && h.Cena >= 0 && h.Kolicina > 0)
                    {
                        v.Naziv = h.Naziv;
                        v.Opis = h.Opis;
                        v.Cena = h.Cena;
                        v.Slika = h.Slika;
                        v.Kolicina = h.Kolicina;
                        v.JedinicaMere = h.JedinicaMere;

                        Context.Hrana.Update(v);
                        await Context.SaveChangesAsync();
                        return Ok(v);
                    }
                    else
                    {
                        throw new Exception("Neispravan unos!");
                    }
                }
                else
                {
                    return Unauthorized("Ne mozete izmeniti hranu!");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Greska: " + ex.Message);
            }
        }
        
        [HttpDelete("ObrisiHranu/{hranaID}")]
        public async Task<ActionResult> ObrisiHranu(int hranaID, int korisnikID)
        {
            try
            {
                var h = await Context.Hrana
                    .Where(h => h.ID == hranaID)
                    .Include(h => h.Ocene)
                    .Include(h => h.Komentari)
                    .SingleOrDefaultAsync();
                if (h == null) return NotFound($"Hrana sa ID-jem {hranaID} nije pronadjena!");

                var k = await Context.Korisnici.FindAsync(korisnikID);
                if (k == null) return NotFound($"Korisnik sa ID-jem {korisnikID} nije pronadjen!");

                if (k.Tip == "Admin")
                {
                    foreach (var ocena in h.Ocene!)
                    {
                        Context.OceneHrane.Remove(ocena);
                    }
                    foreach (var komentar in h.Komentari!)
                    {
                        Context.KomentariHrane.Remove(komentar);
                    }

                    Context.Hrana.Remove(h);
                    await Context.SaveChangesAsync();
                    return Ok(h);
                }
                else
                {
                    return Unauthorized("Ne mozete obrisati hranu!");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Greska: " + ex.Message);
            }
        }

        [HttpGet("PreporucenaHrana/{restoranID}")]
        public async Task<ActionResult> PreporucenaHrana(int restoranID)
        {
            try
            {
                var r = await Context.Restorani.FindAsync(restoranID);
                if (r == null) return NotFound($"Restoran sa ID-jem {restoranID} nije pronadjen!");

                var h = await Context.Hrana
                    .Where(h => h.Restoran!.ID == restoranID)
                    .Include(h => h.Ocene!)
                    .OrderByDescending(h => h.Ocene!.Select(o => (double)o.Vrednost).Average())
                    .Take(3)
                    .ToListAsync();

                return Ok(h);
            }
            catch (Exception ex)
            {
                return BadRequest("Greska: " + ex.Message);
            }
        }
    }
}