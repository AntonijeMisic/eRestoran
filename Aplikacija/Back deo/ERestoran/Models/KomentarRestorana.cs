namespace Models
{
    public class KomentarRestorana : Komentar
    {
        [JsonIgnore]
        public Restoran? Restoran { get; set; }
    }
}