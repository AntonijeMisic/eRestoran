namespace Models
{
    public abstract class Komentar
    {
        [Key]
        public int ID { get; set; }
        public required string Tekst { get; set; }
        public Korisnik? Korisnik { get; set; }
        public DateTime VremePostavljanja { get; set; }
    }
}