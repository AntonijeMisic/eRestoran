namespace Models
{
    public class OcenaRestorana : Ocena
    {
        [JsonIgnore]
        public Restoran? Restoran { get; set; }
    }
}