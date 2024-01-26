namespace Models
{
    public class Rezervacija
    {
        [Key]
        public int ID { get; set; }
        public Korisnik? Korisnik { get; set; }
        [JsonIgnore]
        public Sto? Sto { get; set; }
        public int BrojLjudi { get; set; }
        //[DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime DatumRezervacije { get; set; }
    }
}