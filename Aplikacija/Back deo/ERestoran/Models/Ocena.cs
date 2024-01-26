namespace Models
{
    public abstract class Ocena
    {
        [Key]
        [JsonIgnore]
        public int ID { get; set; }
        public required uint Vrednost { get; set; } //od 1 do 5
        public Korisnik? Korisnik { get; set; }
    }
}