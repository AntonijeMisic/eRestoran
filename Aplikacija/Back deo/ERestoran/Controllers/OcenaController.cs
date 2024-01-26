namespace Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OcenaController : ControllerBase
    {
        public ERestoranContext Context { get; set; }

        public OcenaController(ERestoranContext context)
        {
            Context = context;
        }

        [HttpGet("PrikaziOceneRestorana/{restoranID}")]
        public async Task<ActionResult> PrikaziOceneRestorana(int restoranID)
        {
            var r = await Context.Restorani.FindAsync(restoranID);
            if (r == null) return NotFound($"Restoran sa ID-jem {restoranID} nije pronadjen!");
            
            return Ok(await Context.Restorani
                .Include(r => r.Ocene!)
                .ThenInclude(o => o.Korisnik)
                .Where(r => r.ID == restoranID)
                .Select(r => r.Ocene)
                .SingleOrDefaultAsync());
        }

        [HttpGet("BrojOcenaRestorana/{restoranID}")]
        public async Task<ActionResult> BrojOcenaRestorana(int restoranID)
        {
            int[] niz = new int[5];

            var r = await Context.Restorani.FindAsync(restoranID);
            if (r == null) return NotFound($"Restoran sa ID-jem {restoranID} nije pronadjen!");

            var upit = await Context.Restorani
                .Include(r => r.Ocene!)
                .Where(r => r.ID == restoranID)
                .Select(r => r.Ocene!.Select(o => o.Vrednost))
                .SingleAsync();

            uint[] ocene = upit.ToArray();

            for (int i = 0; i < ocene.Length; i++)
            {
                int index = 5 - (int)ocene[i];
                niz[index]++;
            }

            return Ok(niz);
        }

        [HttpGet("ProsecnaOcenaRestorana/{restoranID}")]
        public async Task<ActionResult> ProsecnaOcenaRestorana(int restoranID)
        {
            try
            {
                var r = await Context.Restorani.FindAsync(restoranID);
                if (r == null) return NotFound($"Restoran sa ID-jem {restoranID} nije pronadjen!");

                double prosek = 0;

                try
                {
                    prosek = await Context.Restorani
                        .Include(r => r.Ocene!)
                        .Where(r => r.ID == restoranID)
                        .Select(r => r.Ocene!.Select(o => (double)o.Vrednost).Average())
                        .SingleOrDefaultAsync();
                }
                catch
                {
                    return Ok(0);
                }

                return Ok(Convert.ToDouble(string.Format($"{prosek:f2}")));
            }
            catch (Exception ex)
            {
                return BadRequest("Greska: " + ex.Message);
            }
        }

        [HttpPost("OceniRestoran/{restoranID}")]
        public async Task<ActionResult> OceniRestoran([FromBody]OcenaRestorana o, int restoranID, int korisnikID)
        {
            try
            {
                var r = await Context.Restorani.FindAsync(restoranID);
                var k = await Context.Korisnici.FindAsync(korisnikID);

                if (r == null) return NotFound($"Restoran sa ID-jem {restoranID} nije pronadjen!");
                if (k == null) return NotFound($"Korisnik sa ID-jem {korisnikID} nije pronadjen!");
                
                var provera = await Context.OceneRestorana
                    .Include(o => o.Restoran)
                    .Include(o => o.Korisnik)
                    .Where(r => r.Restoran!.ID == restoranID && r.Korisnik!.ID == korisnikID)
                    .SingleOrDefaultAsync();

                if (provera != default) throw new Exception("Vec ste ocenili ovaj restoran!");
                
                if (o.Vrednost > 5 || o.Vrednost < 1) throw new Exception("Unesite ocenu od 1 do 5!");
                
                o.Korisnik = k;
                o.Restoran = r;

                await Context.OceneRestorana.AddAsync(o);
                await Context.SaveChangesAsync();
                return Ok(o);
            }
            catch (Exception ex)
            {
                return BadRequest("Greska: " + ex.Message);
            }
        }

        [HttpDelete("ObrisiOcenuRestorana/{restoranID}")]
        public async Task<ActionResult> ObrisiOcenuRestorana(int restoranID, int korisnikID)
        {
            try
            {
                var r = await Context.Restorani.FindAsync(restoranID);
                var k = await Context.Korisnici.FindAsync(korisnikID);

                if (r == null) return NotFound($"Restoran sa ID-jem {restoranID} nije pronadjen!");
                if (k == null) return NotFound($"Korisnik sa ID-jem {korisnikID} nije pronadjen!");
                
                var o = await Context.OceneRestorana
                    .Include(o => o.Restoran)
                    .Include(o => o.Korisnik)
                    .Where(r => r.Restoran!.ID == restoranID && r.Korisnik!.ID == korisnikID)
                    .SingleOrDefaultAsync();

                if (o == default) throw new Exception("Niste ocenili ovaj restoran!");

                Context.OceneRestorana.Remove(o);
                await Context.SaveChangesAsync();
                return Ok(o);
            }
            catch (Exception ex)
            {
                return BadRequest("Greska: " + ex.Message);
            }
        }



        [HttpGet("PrikaziOceneHrane/{hranaID}")]
        public async Task<ActionResult> PrikaziOceneHrane(int hranaID)
        {
            var h = await Context.Hrana.FindAsync(hranaID);
            if (h == null) return NotFound($"Hrana sa ID-jem {hranaID} nije pronadjena!");
            
            return Ok(await Context.Hrana
                .Include(h => h.Ocene!)
                .ThenInclude(o => o.Korisnik)
                .Where(h => h.ID == hranaID)
                .Select(h => h.Ocene)
                .SingleOrDefaultAsync());
        }

        [HttpGet("BrojOcenaHrane/{hranaID}")]
        public async Task<ActionResult> BrojOcenaHrane(int hranaID)
        {
            int[] niz = new int[5];

            var j = await Context.Hrana.FindAsync(hranaID);
            if (j == null) return NotFound($"Hrana sa ID-jem {hranaID} nije pronadjena!");

            var upit = await Context.Hrana
                .Include(j => j.Ocene!)
                .Where(j => j.ID == hranaID)
                .Select(j => j.Ocene!.Select(o => o.Vrednost))
                .SingleAsync();

            uint[] ocene = upit.ToArray();

            for (int i = 0; i < ocene.Length; i++)
            {
                int index = 5 - (int)ocene[i];
                niz[index]++;
            }

            return Ok(niz);
        }

        [HttpGet("ProsecnaOcenaHrane/{hranaID}")]
        public async Task<ActionResult> ProsecnaOcenaHrane(int hranaID)
        {
            try
            {
                var j = await Context.Hrana.FindAsync(hranaID);
                if (j == null) return NotFound($"Hrana sa ID-jem {hranaID} nije pronadjena!");

                double prosek = 0;

                try
                {
                    prosek = await Context.Hrana
                        .Include(j => j.Ocene!)
                        .Where(j => j.ID == hranaID)
                        .Select(j => j.Ocene!.Select(o => (double)o.Vrednost).Average())
                        .SingleOrDefaultAsync();
                }
                catch
                {
                    return Ok(0);
                }

                return Ok(Convert.ToDouble(string.Format($"{prosek:f2}")));
            }
            catch (Exception ex)
            {
                return BadRequest("Greska: " + ex.Message);
            }
        }

        [HttpPost("OceniHranu/{hranaID}")]
        public async Task<ActionResult> OceniHranu([FromBody]OcenaHrane o, int hranaID, int korisnikID)
        {
            try
            {
                var h = await Context.Hrana.FindAsync(hranaID);
                var k = await Context.Korisnici.FindAsync(korisnikID);

                if (h == null) return NotFound($"Hrana sa ID-jem {hranaID} nije pronadjena!");
                if (k == null) return NotFound($"Korisnik sa ID-jem {korisnikID} nije pronadjen!");
                
                var provera = await Context.OceneHrane
                    .Include(o => o.Hrana)
                    .Include(o => o.Korisnik)
                    .Where(r => r.Hrana!.ID == hranaID && r.Korisnik!.ID == korisnikID)
                    .SingleOrDefaultAsync();

                if (provera != default) throw new Exception("Vec ste ocenili ovu hranu!");

                if (o.Vrednost > 5 || o.Vrednost < 1) throw new Exception("Unesite ocenu od 1 do 5!");
                
                o.Korisnik = k;
                o.Hrana = h;

                await Context.OceneHrane.AddAsync(o);
                await Context.SaveChangesAsync();
                return Ok(o);
            }
            catch (Exception ex)
            {
                return BadRequest("Greska: " + ex.Message);
            }
        }

        [HttpDelete("ObrisiOcenuHrane/{hranaID}")]
        public async Task<ActionResult> ObrisiOcenuHrane(int hranaID, int korisnikID)
        {
            try
            {
                var h = await Context.Hrana.FindAsync(hranaID);
                var k = await Context.Korisnici.FindAsync(korisnikID);

                if (h == null) return NotFound($"Hrana sa ID-jem {hranaID} nije pronadjena!");
                if (k == null) return NotFound($"Korisnik sa ID-jem {korisnikID} nije pronadjen!");
                
                var o = await Context.OceneHrane
                    .Include(o => o.Hrana)
                    .Include(o => o.Korisnik)
                    .Where(r => r.Hrana!.ID == hranaID && r.Korisnik!.ID == korisnikID)
                    .SingleOrDefaultAsync();

                if (o == default) throw new Exception("Niste ocenili ovu hranu!");

                Context.OceneHrane.Remove(o);
                await Context.SaveChangesAsync();
                return Ok(o);
            }
            catch (Exception ex)
            {
                return BadRequest("Greska: " + ex.Message);
            }
        }
    }
}