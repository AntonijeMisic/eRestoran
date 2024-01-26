namespace Models
{
    public class Hrana
    {
        [Key]
        public int ID { get; set; }
        public required string Naziv { get; set; }
        public string? Opis { get; set; }
        public required double Cena { get; set; }
        public string? Slika { get; set; } //putanja do slike
        public required double Kolicina { get; set; }
        public required string JedinicaMere { get; set; } //u gramima ili litrama
        public List<OcenaHrane>? Ocene { get; set; } = new List<OcenaHrane>();
        public List<KomentarHrane>? Komentari { get; set; } = new List<KomentarHrane>();
        [JsonIgnore]
        public Restoran? Restoran { get; set; }
    }
}