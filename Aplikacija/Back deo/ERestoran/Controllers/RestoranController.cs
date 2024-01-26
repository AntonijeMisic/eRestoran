namespace Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RestoranController : ControllerBase
    {
        public ERestoranContext Context { get; set; }

        public RestoranController(ERestoranContext context)
        {
            Context = context;
        }

        [HttpGet("PrikaziSve")]
        public async Task<ActionResult> PrikaziSve()
        {
            return Ok(await Context.Restorani
                .Include(r => r.Meni!)
                .ThenInclude(m => m.Ocene)
                .Include(r => r.Meni!)
                .ThenInclude(m => m.Komentari)
                .Include(r => r.Ocene!)
                .ThenInclude(o => o.Korisnik)
                .Include(r => r.Komentari!)
                .ThenInclude(o => o.Korisnik)
                .Include(r => r.Sale!)
                .ThenInclude(s => s.Stolovi)
                .Include(r => r.Sale!)
                .ThenInclude(s => s.Predmeti)
                .ToListAsync()
            );
        }

        [HttpGet("PrikaziRestorane")]
        public async Task<ActionResult> PrikaziRestorane()
        {
            return Ok(await Context.Restorani
                .Include(r => r.Meni!)
                .ToListAsync()
            );
        }

        [HttpGet("PrikaziRestoran/{restoranID}")]
        public async Task<ActionResult> PrikaziRestoran(int restoranID)
        {
            var r = await Context.Restorani.FindAsync(restoranID);
            if (r == null) return NotFound($"Restoran sa ID-jem {restoranID} nije pronadjen!");
            
            return Ok(await Context.Restorani
                .Where(r => r.ID == restoranID)
                .Include(r => r.Meni!)
                .ThenInclude(m => m.Ocene)
                .Include(r => r.Meni!)
                .ThenInclude(m => m.Komentari)
                .Include(r => r.Ocene!)
                .ThenInclude(o => o.Korisnik)
                .Include(r => r.Komentari!)
                .ThenInclude(o => o.Korisnik)
                .Include(r => r.Sale!)
                .ThenInclude(s => s.Stolovi)
                .Include(r => r.Sale!)
                .ThenInclude(s => s.Predmeti)
                .SingleOrDefaultAsync()
            );
        }

        [HttpPost("UnesiRestoran")]
        public async Task<ActionResult> UnesiRestoran([FromBody]Restoran r)
        {
            try
            {
                await Context.Restorani.AddAsync(r);
                await Context.SaveChangesAsync();
                return Ok(r);
            }
            catch (Exception ex)
            {
                return BadRequest("Greska: " + ex.Message);
            }
        }

        [HttpPut("IzmeniRestoran/{restoranID}")]
        public async Task<ActionResult> IzmeniRestoran([FromBody]Restoran r, int restoranID)
        {
            try
            {
                var v = await Context.Restorani.FindAsync(restoranID);
                if (v == null) return NotFound($"Restoran sa ID-jem {restoranID} nije pronadjen!");

                if (!string.IsNullOrWhiteSpace(r.Naziv) && !string.IsNullOrWhiteSpace(r.Adresa))
                {
                    v.Naziv = r.Naziv;
                    v.Adresa = r.Adresa;
                    v.Opis = r.Opis;
                    v.Slika = r.Slika;

                    Context.Restorani.Update(v);
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

        [HttpDelete("ObrisiRestoran/{restoranID}")]
        public async Task<ActionResult> ObrisiRestoran(int restoranID)
        {
            try
            {
                var r = await Context.Restorani
                    .Where(r => r.ID == restoranID)
                    .Include(r => r.Meni!)
                    .ThenInclude(m => m.Ocene)
                    .Include(r => r.Meni!)
                    .ThenInclude(m => m.Komentari)
                    .Include(r => r.Ocene!)
                    .ThenInclude(o => o.Korisnik)
                    .Include(r => r.Komentari!)
                    .ThenInclude(o => o.Korisnik)
                    .Include(r => r.Sale!)
                    .ThenInclude(s => s.Stolovi)
                    .Include(r => r.Sale!)
                    .ThenInclude(s => s.Predmeti)
                    .SingleOrDefaultAsync();
                if (r == null) return NotFound($"Restoran sa ID-jem {restoranID} nije pronadjen!");

                foreach (var sala in r.Sale!)
                {
                    foreach (var sto in sala.Stolovi!)
                    {
                        Context.Stolovi.Remove(sto);
                    }
                    foreach (var predmet in sala.Predmeti!)
                    {
                        Context.ObjektiSale.Remove(predmet);
                    }
                    Context.Sale.Remove(sala);
                }

                foreach (var hrana in r.Meni!)
                {
                    foreach (var ocena in hrana.Ocene!)
                    {
                        Context.OceneHrane.Remove(ocena);
                    }
                    foreach (var komentar in hrana.Komentari!)
                    {
                        Context.KomentariHrane.Remove(komentar);
                    }
                    Context.Hrana.Remove(hrana);
                }

                foreach (var ocena in r.Ocene!)
                {
                    Context.OceneRestorana.Remove(ocena);
                }

                foreach (var komentar in r.Komentari!)
                {
                    Context.KomentariRestorana.Remove(komentar);
                }

                Context.Restorani.Remove(r);
                await Context.SaveChangesAsync();
                return Ok(r);
            }
            catch (Exception ex)
            {
                return BadRequest("Greska: " + ex.Message);
            }
        }

        [HttpGet("PreporuceniRestorani")]
        public async Task<ActionResult> PreporuceniRestorani()
        {
            try
            {
                return Ok(await Context.Restorani
                    .Include(r => r.Meni!)
                    .Include(r => r.Ocene!)
                    .OrderByDescending(r => r.Ocene!.Select(o => (double)o.Vrednost).Average())
                    .Take(3)
                    .ToListAsync()
                );
            }
            catch (Exception ex)
            {
                return BadRequest("Greska: " + ex.Message);
            }
        }

        // [HttpGet("Pretrazi/{pretraga}")]
        // public async Task<ActionResult> Pretrazi(string pretraga)
        // {
        //     try
        //     {
        //         if (!string.IsNullOrWhiteSpace(pretraga))
        //         {
        //             return Ok(await Context.Restorani
        //                 .Where(r => r.Naziv.Contains(pretraga))
        //                 .Include(r => r.Meni!)
        //                 .ToListAsync()
        //             );
        //         }
        //         else
        //         {
        //             return Ok(await Context.Restorani
        //                 .Include(r => r.Meni!)
        //                 .ToListAsync()
        //             );
        //         }
        //     }
        //     catch (Exception ex)
        //     {
        //         return BadRequest("Greska: " + ex.Message);
        //     }
        // }
    }
}
