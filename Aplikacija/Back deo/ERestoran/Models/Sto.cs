namespace Models
{
    public class Sto
    {
        [Key]
        public int ID { get; set; }
        public required string Naziv { get; set; }
        public required double PozicijaX { get; set; } //u metrima, skroz levo je x = 0
        public required double PozicijaY { get; set; } //u metrima, skroz gore je y = 0
        public required double Sirina { get; set; } //u metrima
        public required double Duzina { get; set; } //u metrima
        [JsonIgnore]
        public Sala? Sala { get; set; }
        public required int BrojMesta { get; set; }
        public List<Rezervacija>? Rezervacije { get; set; }
    }
}