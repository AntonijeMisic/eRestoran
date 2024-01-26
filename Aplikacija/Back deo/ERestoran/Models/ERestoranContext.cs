namespace Models
{
    public class ERestoranContext : DbContext
    {
        public required DbSet<Korisnik> Korisnici { get; set; }

        public required DbSet<Restoran> Restorani { get; set; }
        public required DbSet<OcenaRestorana> OceneRestorana { get; set; }
        public required DbSet<KomentarRestorana> KomentariRestorana { get; set; }

        public required DbSet<Hrana> Hrana { get; set; }
        public required DbSet<OcenaHrane> OceneHrane { get; set; }
        public required DbSet<KomentarHrane> KomentariHrane { get; set; }
        
        public required DbSet<Sala> Sale { get; set; }
        public required DbSet<Sto> Stolovi { get; set; }
        public required DbSet<ObjekatSale> ObjektiSale { get; set; }
        
        public required DbSet<Rezervacija> Rezervacije { get; set; }

        public ERestoranContext(DbContextOptions options) : base(options)
        {
            
        }
    }
}