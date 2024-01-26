namespace Models
{
    public class KomentarHrane : Komentar
    {
        [JsonIgnore]
        public Hrana? Hrana { get; set; }
    }
}