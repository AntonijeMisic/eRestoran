namespace Models
{
    public class Restoran
    {
        [Key]
        public int ID { get; set; }
        public required string Naziv { get; set; }
        public required string Adresa { get; set; }
        public string? Opis { get; set; }
        public string? Slika { get; set; }
        public List<Sala>? Sale { get; set; } = new List<Sala>();
        public List<Hrana>? Meni { get; set; } = new List<Hrana>();
        public List<OcenaRestorana>? Ocene { get; set; } = new List<OcenaRestorana>();
        public List<KomentarRestorana>? Komentari { get; set; } = new List<KomentarRestorana>();
    }
}