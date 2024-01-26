using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ERestoran.Migrations
{
    /// <inheritdoc />
    public partial class V7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ObjektiSale_Sale_SalaID1",
                table: "ObjektiSale");

            migrationBuilder.DropForeignKey(
                name: "FK_Rezervacije_ObjektiSale_StoID",
                table: "Rezervacije");

            migrationBuilder.DropIndex(
                name: "IX_ObjektiSale_SalaID1",
                table: "ObjektiSale");

            migrationBuilder.DropColumn(
                name: "BrojMesta",
                table: "ObjektiSale");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "ObjektiSale");

            migrationBuilder.DropColumn(
                name: "SalaID1",
                table: "ObjektiSale");

            migrationBuilder.CreateTable(
                name: "Stolovi",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PozicijaX = table.Column<double>(type: "float", nullable: false),
                    PozicijaY = table.Column<double>(type: "float", nullable: false),
                    Duzina = table.Column<double>(type: "float", nullable: false),
                    Sirina = table.Column<double>(type: "float", nullable: false),
                    SalaID = table.Column<int>(type: "int", nullable: true),
                    BrojMesta = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stolovi", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Stolovi_Sale_SalaID",
                        column: x => x.SalaID,
                        principalTable: "Sale",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Stolovi_SalaID",
                table: "Stolovi",
                column: "SalaID");

            migrationBuilder.AddForeignKey(
                name: "FK_Rezervacije_Stolovi_StoID",
                table: "Rezervacije",
                column: "StoID",
                principalTable: "Stolovi",
                principalColumn: "ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rezervacije_Stolovi_StoID",
                table: "Rezervacije");

            migrationBuilder.DropTable(
                name: "Stolovi");

            migrationBuilder.AddColumn<int>(
                name: "BrojMesta",
                table: "ObjektiSale",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "ObjektiSale",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "SalaID1",
                table: "ObjektiSale",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ObjektiSale_SalaID1",
                table: "ObjektiSale",
                column: "SalaID1");

            migrationBuilder.AddForeignKey(
                name: "FK_ObjektiSale_Sale_SalaID1",
                table: "ObjektiSale",
                column: "SalaID1",
                principalTable: "Sale",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Rezervacije_ObjektiSale_StoID",
                table: "Rezervacije",
                column: "StoID",
                principalTable: "ObjektiSale",
                principalColumn: "ID");
        }
    }
}
