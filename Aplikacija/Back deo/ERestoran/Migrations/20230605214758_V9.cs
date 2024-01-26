using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ERestoran.Migrations
{
    /// <inheritdoc />
    public partial class V9 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rezervacije_Restorani_RestoranID",
                table: "Rezervacije");

            migrationBuilder.DropIndex(
                name: "IX_Rezervacije_RestoranID",
                table: "Rezervacije");

            migrationBuilder.DropColumn(
                name: "RestoranID",
                table: "Rezervacije");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RestoranID",
                table: "Rezervacije",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rezervacije_RestoranID",
                table: "Rezervacije",
                column: "RestoranID");

            migrationBuilder.AddForeignKey(
                name: "FK_Rezervacije_Restorani_RestoranID",
                table: "Rezervacije",
                column: "RestoranID",
                principalTable: "Restorani",
                principalColumn: "ID");
        }
    }
}
