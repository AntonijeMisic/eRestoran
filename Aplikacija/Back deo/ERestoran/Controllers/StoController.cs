namespace Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StoController : ControllerBase
    {
        public ERestoranContext Context { get; set; }

        public StoController(ERestoranContext context)
        {
            Context = context;
        }

        [HttpGet("PrikaziSveStolove")]
        public async Task<ActionResult> PrikaziSveStolove()
        {
            return Ok(await Context.Stolovi
                .Include(s => s.Rezervacije!)
                .ThenInclude(r => r.Korisnik)
                .ToListAsync()
            );
        }

        [HttpGet("PrikaziStolove/{salaID}")]
        public async Task<ActionResult> PrikaziStolove(int salaID)
        {
            var s = await Context.Sale.FindAsync(salaID);
            if (s == null) return NotFound($"Sala sa ID-jem {salaID} nije pronadjena!");

            return Ok(await Context.Stolovi
                .Where(s => s.Sala!.ID == salaID)
                .Include(s => s.Rezervacije!)
                .ThenInclude(r => r.Korisnik)
                .ToListAsync()
            );
        }

        [HttpGet("PrikaziSto/{stoID}")]
        public async Task<ActionResult> PrikaziSto(int stoID)
        {
            var s = await Context.Stolovi.FindAsync(stoID);
            if (s == null) return NotFound($"Sto sa ID-jem {stoID} nije pronadjen!");

            return Ok(await Context.Stolovi
                .Where(s => s.ID == stoID)
                .Include(s => s.Rezervacije!)
                .ThenInclude(r => r.Korisnik)
                .SingleOrDefaultAsync()
            );
        }

        [HttpPost("DodajSto/{salaID}")]
        public async Task<ActionResult> DodajSto(int salaID, [FromBody]Sto sto)
        {
            try
            {
                var s = await Context.Sale.FindAsync(salaID);
                if (s == null) return NotFound($"Sala sa ID-jem {salaID} nije pronadjena!");

                if (sto.PozicijaX >= 0 && sto.PozicijaY >= 0 && sto.Duzina > 0 && sto.Sirina > 0 && sto.BrojMesta >= 1)
                {
                    sto.Sala = s;

                    await Context.Stolovi.AddAsync(sto);
                    await Context.SaveChangesAsync();
                    return Ok(sto);
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

        [HttpPut("IzmeniSto/{stoID}")]
        public async Task<ActionResult> IzmeniSto(int stoID, [FromBody]Sto s)
        {
            try
            {
                var v = await Context.Stolovi.FindAsync(stoID);
                if (v == null) return NotFound($"Sto sa ID-jem {stoID} nije pronadjen!");

                if (s.PozicijaX >= 0 && s.PozicijaY >= 0 && s.Sirina > 0 && s.Duzina > 0 && s.BrojMesta >= 1)
                {
                    v.PozicijaX = s.PozicijaX;
                    v.PozicijaY = s.PozicijaY;
                    v.Sirina = s.Sirina;
                    v.Duzina = s.Duzina;
                    v.BrojMesta = s.BrojMesta;

                    Context.Stolovi.Update(v);
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

        [HttpDelete("ObrisiSto/{stoID}")]
        public async Task<ActionResult> ObrisiSto(int stoID)
        {
            try
            {
                var s = await Context.Stolovi.FindAsync(stoID);
                if (s == null) return NotFound($"Sto sa ID-jem {stoID} nije pronadjen!");

                Context.Stolovi.Remove(s);
                await Context.SaveChangesAsync();
                return Ok(s);
            }
            catch (Exception ex)
            {
                return BadRequest("Greska: " + ex.Message);
            }
        }
    }
}