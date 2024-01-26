namespace Models
{
    public class OcenaHrane : Ocena
    {
        [JsonIgnore]
        public Hrana? Hrana { get; set; }
    }
}