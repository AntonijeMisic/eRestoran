using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ERestoran.Migrations
{
    /// <inheritdoc />
    public partial class V1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Korisnici",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Telefon = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Tip = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Korisnici", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Restorani",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Adresa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Slika = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Restorani", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Hrana",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cena = table.Column<double>(type: "float", nullable: false),
                    Slika = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RestoranID = table.Column<int>(type: "int", nullable: true),
                    Kolicina = table.Column<int>(type: "int", nullable: true),
                    Zapremina = table.Column<double>(type: "float", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hrana", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Hrana_Restorani_RestoranID",
                        column: x => x.RestoranID,
                        principalTable: "Restorani",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "KomentariRestorana",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RestoranID = table.Column<int>(type: "int", nullable: false),
                    Tekst = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KorisnikID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KomentariRestorana", x => x.ID);
                    table.ForeignKey(
                        name: "FK_KomentariRestorana_Korisnici_KorisnikID",
                        column: x => x.KorisnikID,
                        principalTable: "Korisnici",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_KomentariRestorana_Restorani_RestoranID",
                        column: x => x.RestoranID,
                        principalTable: "Restorani",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OceneRestorana",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RestoranID = table.Column<int>(type: "int", nullable: false),
                    Vrednost = table.Column<long>(type: "bigint", nullable: false),
                    KorisnikID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OceneRestorana", x => x.ID);
                    table.ForeignKey(
                        name: "FK_OceneRestorana_Korisnici_KorisnikID",
                        column: x => x.KorisnikID,
                        principalTable: "Korisnici",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OceneRestorana_Restorani_RestoranID",
                        column: x => x.RestoranID,
                        principalTable: "Restorani",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Sale",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Duzina = table.Column<double>(type: "float", nullable: false),
                    Sirina = table.Column<double>(type: "float", nullable: false),
                    RestoranID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sale", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Sale_Restorani_RestoranID",
                        column: x => x.RestoranID,
                        principalTable: "Restorani",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "KomentariHrane",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HranaID = table.Column<int>(type: "int", nullable: false),
                    Tekst = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KorisnikID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KomentariHrane", x => x.ID);
                    table.ForeignKey(
                        name: "FK_KomentariHrane_Hrana_HranaID",
                        column: x => x.HranaID,
                        principalTable: "Hrana",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_KomentariHrane_Korisnici_KorisnikID",
                        column: x => x.KorisnikID,
                        principalTable: "Korisnici",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OceneHrane",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HranaID = table.Column<int>(type: "int", nullable: false),
                    Vrednost = table.Column<long>(type: "bigint", nullable: false),
                    KorisnikID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OceneHrane", x => x.ID);
                    table.ForeignKey(
                        name: "FK_OceneHrane_Hrana_HranaID",
                        column: x => x.HranaID,
                        principalTable: "Hrana",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OceneHrane_Korisnici_KorisnikID",
                        column: x => x.KorisnikID,
                        principalTable: "Korisnici",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ObjekatSale",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PozicijaX = table.Column<double>(type: "float", nullable: false),
                    PozicijaY = table.Column<double>(type: "float", nullable: false),
                    Duzina = table.Column<double>(type: "float", nullable: false),
                    Sirina = table.Column<double>(type: "float", nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SalaID = table.Column<int>(type: "int", nullable: true),
                    BrojMesta = table.Column<int>(type: "int", nullable: true),
                    Rezervisano = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ObjekatSale", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ObjekatSale_Sale_SalaID",
                        column: x => x.SalaID,
                        principalTable: "Sale",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Rezervacije",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RestoranID = table.Column<int>(type: "int", nullable: false),
                    StoID = table.Column<int>(type: "int", nullable: false),
                    KorisnikID = table.Column<int>(type: "int", nullable: false),
                    DatumRezervacije = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rezervacije", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Rezervacije_Korisnici_KorisnikID",
                        column: x => x.KorisnikID,
                        principalTable: "Korisnici",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Rezervacije_ObjekatSale_StoID",
                        column: x => x.StoID,
                        principalTable: "ObjekatSale",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Rezervacije_Restorani_RestoranID",
                        column: x => x.RestoranID,
                        principalTable: "Restorani",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Hrana_RestoranID",
                table: "Hrana",
                column: "RestoranID");

            migrationBuilder.CreateIndex(
                name: "IX_KomentariHrane_HranaID",
                table: "KomentariHrane",
                column: "HranaID");

            migrationBuilder.CreateIndex(
                name: "IX_KomentariHrane_KorisnikID",
                table: "KomentariHrane",
                column: "KorisnikID");

            migrationBuilder.CreateIndex(
                name: "IX_KomentariRestorana_KorisnikID",
                table: "KomentariRestorana",
                column: "KorisnikID");

            migrationBuilder.CreateIndex(
                name: "IX_KomentariRestorana_RestoranID",
                table: "KomentariRestorana",
                column: "RestoranID");

            migrationBuilder.CreateIndex(
                name: "IX_ObjekatSale_SalaID",
                table: "ObjekatSale",
                column: "SalaID");

            migrationBuilder.CreateIndex(
                name: "IX_OceneHrane_HranaID",
                table: "OceneHrane",
                column: "HranaID");

            migrationBuilder.CreateIndex(
                name: "IX_OceneHrane_KorisnikID",
                table: "OceneHrane",
                column: "KorisnikID");

            migrationBuilder.CreateIndex(
                name: "IX_OceneRestorana_KorisnikID",
                table: "OceneRestorana",
                column: "KorisnikID");

            migrationBuilder.CreateIndex(
                name: "IX_OceneRestorana_RestoranID",
                table: "OceneRestorana",
                column: "RestoranID");

            migrationBuilder.CreateIndex(
                name: "IX_Rezervacije_KorisnikID",
                table: "Rezervacije",
                column: "KorisnikID");

            migrationBuilder.CreateIndex(
                name: "IX_Rezervacije_RestoranID",
                table: "Rezervacije",
                column: "RestoranID");

            migrationBuilder.CreateIndex(
                name: "IX_Rezervacije_StoID",
                table: "Rezervacije",
                column: "StoID");

            migrationBuilder.CreateIndex(
                name: "IX_Sale_RestoranID",
                table: "Sale",
                column: "RestoranID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "KomentariHrane");

            migrationBuilder.DropTable(
                name: "KomentariRestorana");

            migrationBuilder.DropTable(
                name: "OceneHrane");

            migrationBuilder.DropTable(
                name: "OceneRestorana");

            migrationBuilder.DropTable(
                name: "Rezervacije");

            migrationBuilder.DropTable(
                name: "Hrana");

            migrationBuilder.DropTable(
                name: "Korisnici");

            migrationBuilder.DropTable(
                name: "ObjekatSale");

            migrationBuilder.DropTable(
                name: "Sale");

            migrationBuilder.DropTable(
                name: "Restorani");
        }
    }
}
