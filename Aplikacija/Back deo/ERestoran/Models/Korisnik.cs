namespace Models
{
    public class Korisnik
    {
        [Key]
        public int ID { get; set; }
        public string? Ime { get; set; }
        public string? Prezime { get; set; }
        public string? Email { get; set; }
        public required string Username { get; set; }
        public required string Password { get; set; }
        public string? Telefon { get; set; }
        public string? Tip { get; set; }
        public string? Token { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryDate { get; set; }
    }
}