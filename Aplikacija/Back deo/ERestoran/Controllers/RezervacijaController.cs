namespace Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RezervacijaController : ControllerBase
    {
        public ERestoranContext Context { get; set; }

        public RezervacijaController(ERestoranContext context)
        {
            Context = context;
        }

        [HttpGet("PrikaziRezervacije")]
        public async Task<ActionResult> PrikaziRezervacije()
        {
            return Ok(await Context.Rezervacije
                .Include(r => r.Sto)
                .Include(r => r.Korisnik)
                .ToListAsync()
            );
        }

        [HttpGet("PrikaziRezervacije/{salaID}")]
        public async Task<ActionResult> PrikaziRezervacije(int salaID)
        {
            var s = await Context.Sale.FindAsync(salaID);
            if (s == null) return NotFound($"Sala sa ID-jem {salaID} nije pronadjena!");

            return Ok(await Context.Rezervacije
                .Where(r => r.Sto!.Sala!.ID == salaID)
                .Include(r => r.Sto)
                .Include(r => r.Korisnik)
                .ToListAsync()
            );
        }

        [HttpGet("PrikaziRezervacije/{salaID}/{stoID}")]
        public async Task<ActionResult> PrikaziRezervacije(int salaID, int stoID)
        {
            var s = await Context.Sale.FindAsync(salaID);
            if (s == null) return NotFound($"Sala sa ID-jem {salaID} nije pronadjena!");

            var sto = await Context.Stolovi.FindAsync(stoID);
            if (sto == null) return NotFound($"Sto sa ID-jem {stoID} nije pronadjen!");

            return Ok(await Context.Rezervacije
                .Where(r => r.Sto!.Sala!.ID == salaID && r.Sto!.ID == stoID)
                .Include(r => r.Sto)
                .Include(r => r.Korisnik)
                .ToListAsync()
            );
        }

        [HttpPost("Rezervisi/{stoID}")]
        public async Task<ActionResult> Rezervisi([FromBody]Rezervacija rez, int stoID, int korisnikID/*, int brojLjudi, DateTime datum*/)
        {
            try
            {
                var s = await Context.Stolovi
                    .Where(s => s.ID == stoID)
                    .Include(s => s.Rezervacije)
                    .SingleOrDefaultAsync();
                if (s == null) return NotFound($"Sto sa ID-jem {stoID} nije pronadjen!");
    
                foreach (Rezervacija r in s.Rezervacije!)
                {
                    if (r.DatumRezervacije.Day == rez.DatumRezervacije.Day &&
                        r.DatumRezervacije.Month == rez.DatumRezervacije.Month &&
                        r.DatumRezervacije.Year == rez.DatumRezervacije.Year
                    ) {
                        throw new Exception("Sto je rezervisan za taj datum!");
                    }
                }

                var k = await Context.Korisnici.FindAsync(korisnikID);
                if (k == null) return NotFound($"Korisnik sa ID-jem {korisnikID} nije pronadjen!");

                if (rez.BrojLjudi > s.BrojMesta || rez.BrojLjudi < 2) throw new Exception("Broj osoba za rezervaciju stola nije validan!");
                if (rez.DatumRezervacije < DateTime.Today) throw new Exception("Ne mozete tada rezervisati sto!");

                rez.Sto = s;
                rez.Korisnik = k;

                await Context.Rezervacije.AddAsync(rez);
                Context.Stolovi.Update(s);
                await Context.SaveChangesAsync();

                return Ok(rez);
            }
            catch (Exception ex)
            {
                return BadRequest("Greska: " + ex.Message);
            }
        }

        [HttpDelete("ObrisiRezervaciju/{rezervacijaID}")]
        public async Task<ActionResult> ObrisiRezervaciju(int rezervacijaID)
        {
            try
            {
                var rez = await Context.Rezervacije
                    .Where(rez => rez.ID == rezervacijaID)
                    .Include(rez => rez.Sto)
                    .SingleOrDefaultAsync();
                
                if (rez == null || rez == default) return NotFound($"Rezervacija sa ID-jem {rezervacijaID} nije pronadjena!");

                var s = await Context.Stolovi.FindAsync(rez.Sto!.ID);
                if (s == null) return NotFound($"Sto sa ID-jem {rez.Sto!.ID} nije pronadjen!");

                Context.Rezervacije.Remove(rez);
                Context.Stolovi.Update(s);
                await Context.SaveChangesAsync();

                return Ok(rez);
            }
            catch (Exception ex)
            {
                return BadRequest("Greska: " + ex.Message);
            }
        }
    }
}
