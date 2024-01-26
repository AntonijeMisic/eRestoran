namespace Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KomentarController : ControllerBase
    {
        public ERestoranContext Context { get; set; }

        public KomentarController(ERestoranContext context)
        {
            Context = context;
        }

        [HttpGet("PrikaziKomentareRestorana/{restoranID}")]
        public async Task<ActionResult> PrikaziKomentareRestorana(int restoranID)
        {
            var r = await Context.Restorani.FindAsync(restoranID);
            if (r == null) return NotFound($"Restoran sa ID-jem {restoranID} nije pronadjen!");
            
            return Ok(await Context.Restorani
                .Include(r => r.Komentari!)
                .ThenInclude(o => o.Korisnik)
                .Where(r => r.ID == restoranID)
                .Select(r => r.Komentari)
                .SingleOrDefaultAsync()
            );
        }

        [HttpPost("KomentarisiRestoran/{restoranID}")]
        public async Task<ActionResult> KomentarisiRestoran([FromBody]KomentarRestorana kom, int restoranID, int korisnikID)
        {
            try
            {
                var r = await Context.Restorani.FindAsync(restoranID);
                var k = await Context.Korisnici.FindAsync(korisnikID);

                if (r == null) return NotFound($"Restoran sa ID-jem {restoranID} nije pronadjen!");
                if (k == null) return NotFound($"Korisnik sa ID-jem {korisnikID} nije pronadjen!");
              
                if (string.IsNullOrWhiteSpace(kom.Tekst)) throw new Exception("Komentar ne sme biti prazno polje");
                if (kom.Tekst.Length > 1000) throw new Exception("Duzina komentara mora biti do 1000 karaktera!");
                
                kom.Korisnik = k;
                kom.Restoran = r;
                kom.VremePostavljanja = DateTime.Now;

                await Context.KomentariRestorana.AddAsync(kom);
                await Context.SaveChangesAsync();
                return Ok(kom);
            }
            catch (Exception ex)
            {
                return BadRequest("Greska: " + ex.Message);
            }
        }

        [HttpPut("IzmeniKomentarRestorana/{restoranID}")]
        public async Task<ActionResult> IzmeniKomentarRestorana(int restoranID, int korisnikID, int komentarID, [FromBody]string tekst)
        {
            try
            {
                var r = await Context.Restorani.FindAsync(restoranID);
                var k = await Context.Korisnici.FindAsync(korisnikID);
                var kom = await Context.KomentariRestorana
                    .Where(k => k.ID == komentarID)
                    .Include(k => k.Korisnik)
                    .SingleOrDefaultAsync();

                if (r == null) return NotFound($"Restoran sa ID-jem {restoranID} nije pronadjen!");
                if (k == null) return NotFound($"Korisnik sa ID-jem {korisnikID} nije pronadjen!");
                if (kom == null) return NotFound($"Komentar sa ID-jem {komentarID} nije pronadjen!");

                bool admin = k.Tip == "Admin" ? true : false;
                if (kom.Korisnik!.ID != korisnikID && !admin) throw new Exception("Ne mozete izmeniti tudji komentar!");

                if (string.IsNullOrWhiteSpace(tekst)) throw new Exception("Komentar ne sme biti prazno polje");
                if (tekst.Length > 1000) throw new Exception("Duzina komentara mora biti do 1000 karaktera!");

                kom.Tekst = tekst;

                Context.KomentariRestorana.Update(kom);
                await Context.SaveChangesAsync();
                return Ok(kom);
            }
            catch (Exception ex)
            {
                return BadRequest("Greska: " + ex.Message);
            }
        }

        [HttpDelete("ObrisiKomentarRestorana/{restoranID}")]
        public async Task<ActionResult> ObrisiKomentarRestorana(int restoranID, int korisnikID, int komentarID)
        {
            try
            {
                var r = await Context.Restorani.FindAsync(restoranID);
                var k = await Context.Korisnici.FindAsync(korisnikID);
                var kom = await Context.KomentariRestorana
                    .Where(k => k.ID == komentarID)
                    .Include(k => k.Korisnik)
                    .SingleOrDefaultAsync();

                if (r == null) return NotFound($"Restoran sa ID-jem {restoranID} nije pronadjen!");
                if (k == null) return NotFound($"Korisnik sa ID-jem {korisnikID} nije pronadjen!");
                if (kom == null) return NotFound($"Komentar sa ID-jem {komentarID} nije pronadjen!");

                bool admin = k.Tip == "Admin" ? true : false;
                if (kom.Korisnik!.ID != korisnikID && !admin) throw new Exception("Ne mozete obrisati tudji komentar!");

                Context.KomentariRestorana.Remove(kom);
                await Context.SaveChangesAsync();
                return Ok(kom);
            }
            catch (Exception ex)
            {
                return BadRequest("Greska: " + ex.Message);
            }
        }



        [HttpGet("PrikaziKomentareHrane/{hranaID}")]
        public async Task<ActionResult> PrikaziKomentareHrane(int hranaID)
        {
            var h = await Context.Hrana.FindAsync(hranaID);
            if (h == null) return NotFound($"Hrana sa ID-jem {hranaID} nije pronadjena!");
            
            return Ok(await Context.Hrana
                .Include(h => h.Komentari!)
                .ThenInclude(o => o.Korisnik)
                .Where(h => h.ID == hranaID)
                .Select(h => h.Komentari)
                .SingleOrDefaultAsync()
            );
        }

        [HttpPost("KomentarisiHranu/{hranaID}")]
        public async Task<ActionResult> OceniHranu([FromBody]KomentarHrane kom, int hranaID, int korisnikID)
        {
            try
            {
                var h = await Context.Hrana.FindAsync(hranaID);
                var k = await Context.Korisnici.FindAsync(korisnikID);

                if (h == null) return NotFound($"Hrana sa ID-jem {hranaID} nije pronadjena!");
                if (k == null) return NotFound($"Korisnik sa ID-jem {korisnikID} nije pronadjen!");
                
                if (string.IsNullOrWhiteSpace(kom.Tekst)) throw new Exception("Komentar ne sme biti prazno polje");
                if (kom.Tekst.Length > 1000) throw new Exception("Duzina komentara mora biti do 1000 karaktera!");
                
                kom.Korisnik = k;
                kom.Hrana = h;
                kom.VremePostavljanja = DateTime.Now;

                await Context.KomentariHrane.AddAsync(kom);
                await Context.SaveChangesAsync();
                return Ok(kom);
            }
            catch (Exception ex)
            {
                return BadRequest("Greska: " + ex.Message);
            }
        }

        [HttpPut("IzmeniKomentarHrane/{hranaID}")]
        public async Task<ActionResult> IzmeniKomentarHrane(int hranaID, int korisnikID, int komentarID, [FromBody]string tekst)
        {
            try
            {
                var h = await Context.Hrana.FindAsync(hranaID);
                var k = await Context.Korisnici.FindAsync(korisnikID);
                var kom = await Context.KomentariHrane
                    .Where(k => k.ID == komentarID)
                    .Include(k => k.Korisnik)
                    .SingleOrDefaultAsync();

                if (h == null) return NotFound($"Hrana sa ID-jem {hranaID} nije pronadjena!");
                if (k == null) return NotFound($"Korisnik sa ID-jem {korisnikID} nije pronadjen!");
                if (kom == null) return NotFound($"Komentar sa ID-jem {komentarID} nije pronadjen!");

                bool admin = k.Tip == "Admin" ? true : false;
                if (kom.Korisnik!.ID != korisnikID && !admin) throw new Exception("Ne mozete izmeniti tudji komentar!");

                if (string.IsNullOrWhiteSpace(tekst)) throw new Exception("Komentar ne sme biti prazno polje");
                if (tekst.Length > 1000) throw new Exception("Duzina komentara mora biti do 1000 karaktera!");

                kom.Tekst = tekst;

                Context.KomentariHrane.Update(kom);
                await Context.SaveChangesAsync();
                return Ok(kom);
            }
            catch (Exception ex)
            {
                return BadRequest("Greska: " + ex.Message);
            }
        }

        [HttpDelete("ObrisiKomentarHrane/{hranaID}")]
        public async Task<ActionResult> ObrisiOcenuHrane(int hranaID, int korisnikID, int komentarID)
        {
            try
            {
                var j = await Context.Hrana.FindAsync(hranaID);
                var k = await Context.Korisnici.FindAsync(korisnikID);
                var kom = await Context.KomentariHrane
                    .Where(k => k.ID == komentarID)
                    .Include(k => k.Korisnik)
                    .SingleOrDefaultAsync();

                if (j == null) return NotFound($"Hrana sa ID-jem {hranaID} nije pronadjena!");
                if (k == null) return NotFound($"Korisnik sa ID-jem {korisnikID} nije pronadjen!");
                if (kom == null) return NotFound($"Komentar sa ID-jem {komentarID} nije pronadjen!");

                bool admin = k.Tip == "Admin" ? true : false;
                if (kom.Korisnik!.ID != korisnikID && !admin) throw new Exception("Ne mozete obrisati tudji komentar!");

                Context.KomentariHrane.Remove(kom);
                await Context.SaveChangesAsync();
                return Ok(kom);
            }
            catch (Exception ex)
            {
                return BadRequest("Greska: " + ex.Message);
            }
        }
    }
}