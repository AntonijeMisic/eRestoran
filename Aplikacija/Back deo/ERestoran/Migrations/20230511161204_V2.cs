using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ERestoran.Migrations
{
    /// <inheritdoc />
    public partial class V2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KomentariHrane_Hrana_HranaID",
                table: "KomentariHrane");

            migrationBuilder.DropForeignKey(
                name: "FK_KomentariHrane_Korisnici_KorisnikID",
                table: "KomentariHrane");

            migrationBuilder.DropForeignKey(
                name: "FK_KomentariRestorana_Korisnici_KorisnikID",
                table: "KomentariRestorana");

            migrationBuilder.DropForeignKey(
                name: "FK_KomentariRestorana_Restorani_RestoranID",
                table: "KomentariRestorana");

            migrationBuilder.DropForeignKey(
                name: "FK_OceneHrane_Hrana_HranaID",
                table: "OceneHrane");

            migrationBuilder.DropForeignKey(
                name: "FK_OceneHrane_Korisnici_KorisnikID",
                table: "OceneHrane");

            migrationBuilder.DropForeignKey(
                name: "FK_OceneRestorana_Korisnici_KorisnikID",
                table: "OceneRestorana");

            migrationBuilder.DropForeignKey(
                name: "FK_OceneRestorana_Restorani_RestoranID",
                table: "OceneRestorana");

            migrationBuilder.DropForeignKey(
                name: "FK_Rezervacije_Korisnici_KorisnikID",
                table: "Rezervacije");

            migrationBuilder.DropForeignKey(
                name: "FK_Rezervacije_ObjekatSale_StoID",
                table: "Rezervacije");

            migrationBuilder.DropForeignKey(
                name: "FK_Rezervacije_Restorani_RestoranID",
                table: "Rezervacije");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "Korisnici");

            migrationBuilder.DropColumn(
                name: "Zapremina",
                table: "Hrana");

            migrationBuilder.RenameColumn(
                name: "Discriminator",
                table: "Hrana",
                newName: "JedinicaMere");

            migrationBuilder.AlterColumn<int>(
                name: "StoID",
                table: "Rezervacije",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "RestoranID",
                table: "Rezervacije",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "KorisnikID",
                table: "Rezervacije",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "RestoranID",
                table: "OceneRestorana",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "KorisnikID",
                table: "OceneRestorana",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "KorisnikID",
                table: "OceneHrane",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "HranaID",
                table: "OceneHrane",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "Token",
                table: "Korisnici",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "RestoranID",
                table: "KomentariRestorana",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "KorisnikID",
                table: "KomentariRestorana",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "KorisnikID",
                table: "KomentariHrane",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "HranaID",
                table: "KomentariHrane",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<double>(
                name: "Kolicina",
                table: "Hrana",
                type: "float",
                nullable: false,
                defaultValue: 0.0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_KomentariHrane_Hrana_HranaID",
                table: "KomentariHrane",
                column: "HranaID",
                principalTable: "Hrana",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_KomentariHrane_Korisnici_KorisnikID",
                table: "KomentariHrane",
                column: "KorisnikID",
                principalTable: "Korisnici",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_KomentariRestorana_Korisnici_KorisnikID",
                table: "KomentariRestorana",
                column: "KorisnikID",
                principalTable: "Korisnici",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_KomentariRestorana_Restorani_RestoranID",
                table: "KomentariRestorana",
                column: "RestoranID",
                principalTable: "Restorani",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_OceneHrane_Hrana_HranaID",
                table: "OceneHrane",
                column: "HranaID",
                principalTable: "Hrana",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_OceneHrane_Korisnici_KorisnikID",
                table: "OceneHrane",
                column: "KorisnikID",
                principalTable: "Korisnici",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_OceneRestorana_Korisnici_KorisnikID",
                table: "OceneRestorana",
                column: "KorisnikID",
                principalTable: "Korisnici",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_OceneRestorana_Restorani_RestoranID",
                table: "OceneRestorana",
                column: "RestoranID",
                principalTable: "Restorani",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Rezervacije_Korisnici_KorisnikID",
                table: "Rezervacije",
                column: "KorisnikID",
                principalTable: "Korisnici",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Rezervacije_ObjekatSale_StoID",
                table: "Rezervacije",
                column: "StoID",
                principalTable: "ObjekatSale",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Rezervacije_Restorani_RestoranID",
                table: "Rezervacije",
                column: "RestoranID",
                principalTable: "Restorani",
                principalColumn: "ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KomentariHrane_Hrana_HranaID",
                table: "KomentariHrane");

            migrationBuilder.DropForeignKey(
                name: "FK_KomentariHrane_Korisnici_KorisnikID",
                table: "KomentariHrane");

            migrationBuilder.DropForeignKey(
                name: "FK_KomentariRestorana_Korisnici_KorisnikID",
                table: "KomentariRestorana");

            migrationBuilder.DropForeignKey(
                name: "FK_KomentariRestorana_Restorani_RestoranID",
                table: "KomentariRestorana");

            migrationBuilder.DropForeignKey(
                name: "FK_OceneHrane_Hrana_HranaID",
                table: "OceneHrane");

            migrationBuilder.DropForeignKey(
                name: "FK_OceneHrane_Korisnici_KorisnikID",
                table: "OceneHrane");

            migrationBuilder.DropForeignKey(
                name: "FK_OceneRestorana_Korisnici_KorisnikID",
                table: "OceneRestorana");

            migrationBuilder.DropForeignKey(
                name: "FK_OceneRestorana_Restorani_RestoranID",
                table: "OceneRestorana");

            migrationBuilder.DropForeignKey(
                name: "FK_Rezervacije_Korisnici_KorisnikID",
                table: "Rezervacije");

            migrationBuilder.DropForeignKey(
                name: "FK_Rezervacije_ObjekatSale_StoID",
                table: "Rezervacije");

            migrationBuilder.DropForeignKey(
                name: "FK_Rezervacije_Restorani_RestoranID",
                table: "Rezervacije");

            migrationBuilder.DropColumn(
                name: "Token",
                table: "Korisnici");

            migrationBuilder.RenameColumn(
                name: "JedinicaMere",
                table: "Hrana",
                newName: "Discriminator");

            migrationBuilder.AlterColumn<int>(
                name: "StoID",
                table: "Rezervacije",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "RestoranID",
                table: "Rezervacije",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "KorisnikID",
                table: "Rezervacije",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "RestoranID",
                table: "OceneRestorana",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "KorisnikID",
                table: "OceneRestorana",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "KorisnikID",
                table: "OceneHrane",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "HranaID",
                table: "OceneHrane",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "Korisnici",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<int>(
                name: "RestoranID",
                table: "KomentariRestorana",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "KorisnikID",
                table: "KomentariRestorana",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "KorisnikID",
                table: "KomentariHrane",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "HranaID",
                table: "KomentariHrane",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Kolicina",
                table: "Hrana",
                type: "int",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AddColumn<double>(
                name: "Zapremina",
                table: "Hrana",
                type: "float",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_KomentariHrane_Hrana_HranaID",
                table: "KomentariHrane",
                column: "HranaID",
                principalTable: "Hrana",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_KomentariHrane_Korisnici_KorisnikID",
                table: "KomentariHrane",
                column: "KorisnikID",
                principalTable: "Korisnici",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_KomentariRestorana_Korisnici_KorisnikID",
                table: "KomentariRestorana",
                column: "KorisnikID",
                principalTable: "Korisnici",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_KomentariRestorana_Restorani_RestoranID",
                table: "KomentariRestorana",
                column: "RestoranID",
                principalTable: "Restorani",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OceneHrane_Hrana_HranaID",
                table: "OceneHrane",
                column: "HranaID",
                principalTable: "Hrana",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OceneHrane_Korisnici_KorisnikID",
                table: "OceneHrane",
                column: "KorisnikID",
                principalTable: "Korisnici",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OceneRestorana_Korisnici_KorisnikID",
                table: "OceneRestorana",
                column: "KorisnikID",
                principalTable: "Korisnici",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OceneRestorana_Restorani_RestoranID",
                table: "OceneRestorana",
                column: "RestoranID",
                principalTable: "Restorani",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rezervacije_Korisnici_KorisnikID",
                table: "Rezervacije",
                column: "KorisnikID",
                principalTable: "Korisnici",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rezervacije_ObjekatSale_StoID",
                table: "Rezervacije",
                column: "StoID",
                principalTable: "ObjekatSale",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rezervacije_Restorani_RestoranID",
                table: "Rezervacije",
                column: "RestoranID",
                principalTable: "Restorani",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
