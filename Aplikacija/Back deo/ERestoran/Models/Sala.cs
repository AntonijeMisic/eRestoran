namespace Models
{
    public class Sala
    {
        [Key]
        public int ID { get; set; }
        public required double Duzina { get; set; } //u metrima
        public required double Sirina { get; set; } //u metrima
        public List<Sto>? Stolovi { get; set; }
        public List<ObjekatSale>? Predmeti { get; set; }
        [JsonIgnore]
        public Restoran? Restoran { get; set; }
    }
}