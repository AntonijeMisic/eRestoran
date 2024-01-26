namespace Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PredmetController : ControllerBase
    {
        public ERestoranContext Context { get; set; }

        public PredmetController(ERestoranContext context)
        {
            Context = context;
        }

        [HttpGet("PrikaziSvePredmete")]
        public async Task<ActionResult> PrikaziSvePredmete()
        {
            return Ok(await Context.ObjektiSale.ToListAsync());
        }

        [HttpGet("PrikaziPredmete/{salaID}")]
        public async Task<ActionResult> PrikaziPredmete(int salaID)
        {
            var s = await Context.Sale.FindAsync(salaID);
            if (s == null) return NotFound($"Sala sa ID-jem {salaID} nije pronadjena!");

            return Ok(await Context.ObjektiSale.Where(p => p.Sala!.ID == s.ID).ToListAsync());
        }

        [HttpGet("PrikaziPredmet/{stoID}")]
        public async Task<ActionResult> PrikaziPredmet(int stoID)
        {
            var s = await Context.ObjektiSale.FindAsync(stoID);
            if (s == null) return NotFound($"Sto sa ID-jem {stoID} nije pronadjen!");

            return Ok(s);
        }

        [HttpPost("DodajPredmet/{salaID}")]
        public async Task<ActionResult> DodajPredmet(int salaID, [FromBody]ObjekatSale o)
        {
            try
            {
                var s = await Context.Sale.FindAsync(salaID);
                if (s == null) return NotFound($"Sala sa ID-jem {salaID} nije pronadjena!");

                if (o.PozicijaX >= 0 && o.PozicijaY >= 0 && o.Duzina > 0 && o.Sirina > 0)
                {
                    o.Sala = s;

                    await Context.ObjektiSale.AddAsync(o);
                    await Context.SaveChangesAsync();
                    return Ok(o);
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

        [HttpPut("IzmeniPredmet/{predmetID}")]
        public async Task<ActionResult> IzmeniPredmet(int predmetID, [FromBody]ObjekatSale o)
        {
            try
            {
                var v = await Context.ObjektiSale.FindAsync(predmetID);
                if (v == null) return NotFound($"Predmet sa ID-jem {predmetID} nije pronadjen!");

                if (o.PozicijaX >= 0 && o.PozicijaY >= 0 && o.Duzina > 0 && o.Sirina > 0)
                {
                    v.PozicijaX = o.PozicijaX;
                    v.PozicijaY = o.PozicijaY;
                    v.Sirina = o.Sirina;
                    v.Duzina = o.Duzina;

                    Context.ObjektiSale.Update(v);
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

        [HttpDelete("ObrisiPredmet/{predmetID}")]
        public async Task<ActionResult> ObrisiPredmet(int predmetID)
        {
            try
            {
                var s = await Context.ObjektiSale.FindAsync(predmetID);
                if (s == null) return NotFound($"Predmet sa ID-jem {predmetID} nije pronadjen!");

                Context.ObjektiSale.Remove(s);
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