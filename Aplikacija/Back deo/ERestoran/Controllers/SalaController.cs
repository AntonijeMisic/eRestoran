namespace Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SalaController : ControllerBase
    {
        public ERestoranContext Context { get; set; }

        public SalaController(ERestoranContext context)
        {
            Context = context;
        }

        [HttpGet("PrikaziSveSale")]
        public async Task<ActionResult> PrikaziSveSale()
        {
            return Ok(await Context.Sale
                .Include(s => s.Stolovi!)
                .ThenInclude(s => s.Rezervacije!)
                .ThenInclude(r => r.Korisnik)
                .Include(s => s.Predmeti)
                .ToListAsync());
        }

        [HttpGet("PrikaziSaleRestorana/{restoranID}")]
        public async Task<ActionResult> PrikaziSaleRestorana(int restoranID)
        {
            var r = await Context.Restorani.FindAsync(restoranID);
            if (r == null) return NotFound($"Restoran sa ID-jem {restoranID} nije pronadjen!");

            return Ok(await Context.Sale
                .Where(s => s.Restoran!.ID == r.ID)
                .Include(s => s.Stolovi!)
                .ThenInclude(s => s.Rezervacije!)
                .ThenInclude(r => r.Korisnik)
                .Include(s => s.Predmeti)
                .ToListAsync());
        }

        [HttpGet("PrikaziSalu/{salaID}")]
        public async Task<ActionResult> PrikaziSalu(int salaID)
        {
            var s = await Context.Sale.FindAsync(salaID);
            if (s == null) return NotFound($"Sala sa ID-jem {salaID} nije pronadjena!");

            return Ok(await Context.Sale
                .Where(s => s.ID == salaID)
                .Include(s => s.Stolovi!)
                .ThenInclude(s => s.Rezervacije!)
                .ThenInclude(r => r.Korisnik)
                .Include(s => s.Predmeti)
                .SingleOrDefaultAsync()
            );
        }

        [HttpPost("DodajSalu/{restoranID}")]
        public async Task<ActionResult> DodajSalu([FromBody]Sala s, int restoranID)
        {
            try
            {
                var r = await Context.Restorani.FindAsync(restoranID);
                if (r == null) return NotFound($"Restoran sa ID-jem {restoranID} nije pronadjen!");

                s.Restoran = r;

                await Context.Sale.AddAsync(s);
                await Context.SaveChangesAsync();
                return Ok(s);
            }
            catch (Exception ex)
            {
                return BadRequest("Greska: " + ex.Message);
            }
        }

        [HttpPut("IzmeniSalu/{salaID}")]
        public async Task<ActionResult> IzmeniSalu([FromBody]Sala s, int salaID)
        {
            try
            {
                var v = await Context.Sale.FindAsync(salaID);
                if (v == null) return NotFound($"Sala sa ID-jem {salaID} nije pronadjena!");

                if (s.Duzina > 1 && s.Sirina > 1)
                {
                    v.Duzina = s.Duzina;
                    v.Sirina = s.Sirina;

                    Context.Sale.Update(v);
                    await Context.SaveChangesAsync();
                    return Ok(v);
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

        [HttpDelete("ObrisiSalu/{salaID}")]
        public async Task<ActionResult> ObrisiSalu(int salaID)
        {
            try
            {
                var sala = await Context.Sale
                    .Where(s => s.ID == salaID)
                    .Include(s => s.Stolovi)
                    .Include(s => s.Predmeti)
                    .SingleOrDefaultAsync();
                if (sala == null) return NotFound($"Sala sa ID-jem {salaID} nije pronadjena!");

                foreach (var sto in sala.Stolovi!)
                {
                    Context.Stolovi.Remove(sto);
                }
                foreach (var predmet in sala.Predmeti!)
                {
                    Context.ObjektiSale.Remove(predmet);
                }

                Context.Sale.Remove(sala);
                await Context.SaveChangesAsync();
                return Ok(sala);
            }
            catch (Exception ex)
            {
                return BadRequest("Greska: " + ex.Message);
            }
        }
    }
}