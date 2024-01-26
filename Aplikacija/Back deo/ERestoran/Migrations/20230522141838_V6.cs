using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ERestoran.Migrations
{
    /// <inheritdoc />
    public partial class V6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ObjekatSale_Sale_SalaID",
                table: "ObjekatSale");

            migrationBuilder.DropForeignKey(
                name: "FK_Rezervacije_ObjekatSale_StoID",
                table: "Rezervacije");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ObjekatSale",
                table: "ObjekatSale");

            migrationBuilder.DropColumn(
                name: "Rezervisano",
                table: "ObjekatSale");

            migrationBuilder.RenameTable(
                name: "ObjekatSale",
                newName: "ObjektiSale");

            migrationBuilder.RenameIndex(
                name: "IX_ObjekatSale_SalaID",
                table: "ObjektiSale",
                newName: "IX_ObjektiSale_SalaID");

            migrationBuilder.AddColumn<string>(
                name: "Naziv",
                table: "ObjektiSale",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "SalaID1",
                table: "ObjektiSale",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ObjektiSale",
                table: "ObjektiSale",
                column: "ID");

            migrationBuilder.CreateIndex(
                name: "IX_ObjektiSale_SalaID1",
                table: "ObjektiSale",
                column: "SalaID1");

            migrationBuilder.AddForeignKey(
                name: "FK_ObjektiSale_Sale_SalaID",
                table: "ObjektiSale",
                column: "SalaID",
                principalTable: "Sale",
                principalColumn: "ID");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ObjektiSale_Sale_SalaID",
                table: "ObjektiSale");

            migrationBuilder.DropForeignKey(
                name: "FK_ObjektiSale_Sale_SalaID1",
                table: "ObjektiSale");

            migrationBuilder.DropForeignKey(
                name: "FK_Rezervacije_ObjektiSale_StoID",
                table: "Rezervacije");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ObjektiSale",
                table: "ObjektiSale");

            migrationBuilder.DropIndex(
                name: "IX_ObjektiSale_SalaID1",
                table: "ObjektiSale");

            migrationBuilder.DropColumn(
                name: "Naziv",
                table: "ObjektiSale");

            migrationBuilder.DropColumn(
                name: "SalaID1",
                table: "ObjektiSale");

            migrationBuilder.RenameTable(
                name: "ObjektiSale",
                newName: "ObjekatSale");

            migrationBuilder.RenameIndex(
                name: "IX_ObjektiSale_SalaID",
                table: "ObjekatSale",
                newName: "IX_ObjekatSale_SalaID");

            migrationBuilder.AddColumn<bool>(
                name: "Rezervisano",
                table: "ObjekatSale",
                type: "bit",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ObjekatSale",
                table: "ObjekatSale",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_ObjekatSale_Sale_SalaID",
                table: "ObjekatSale",
                column: "SalaID",
                principalTable: "Sale",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Rezervacije_ObjekatSale_StoID",
                table: "Rezervacije",
                column: "StoID",
                principalTable: "ObjekatSale",
                principalColumn: "ID");
        }
    }
}
