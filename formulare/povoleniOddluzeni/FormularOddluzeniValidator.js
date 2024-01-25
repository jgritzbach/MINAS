class NavrhNaOddluzeniFormular{

    // Úkolem této třídy je uchopit elementy z html stránky, které slouží jako formulář a vnitřně je vyhodnocovat
    // Samotné HTML elementy již mely být vytvořeny přidruženým generátorem obsahu.
    // při vytvoření formuláře je mu jako argument předán odkaz na objekt generátoru obsahu, aby mohl formulář odkazovat na jeho hodnoty

    constructor(){
        
        // kolonky s vyplněnými hodnotami (tj. elementy <select>)
        this.kolonkaPlneMoci = document.getElementById("nalezitosti-plne-moci")
        this.kolonkaFormaPodani = document.getElementById("nalezitosti-formy-podani")
        this.kolonkaMistniPrislusnost = document.getElementById("mistni-prislusnost")

    }
        
    vyhodnotitKolonky(){

        const kolonky = [
            this.kolonkaPlneMoci,
            this.kolonkaFormaPodani,
            this.kolonkaMistniPrislusnost,
        ]

        let hodnota, vadne, diskutabilni

        for (const kolonka of kolonky){

            hodnota = kolonka.value

            if (!hodnota){      // pokud někde absentuje vyplnění, nelze vyhodnotit
                return '<br>Doposud nebyly vyplněny všechny potřebné kolonky.<br>Návrh na povolení oddlužení nelze vyhodnotit.'        
            } else if (hodnota === this.go.VADNE){
                vadne = true;
            } else if (hodnota === this.go.DISKUTABILNI){
                diskutabilni = true;
            }
        }   

            
            if (vadne){
                return '<br>Některá z kolonek byla vyhodnocena jako vadná.<br>Návrh na povolení oddlužení pravděpodobně nebude úspěšný.'
            }
            
            if (diskutabilni){
                return '<br>Některá z kolonek byla vyhodnocena jako diskutabilní.<br>Úspěch návrh na povolení je nejsitý, v závislosti na závažnosti okolností.'
            }
            
            return '<br>Všechny kolonky byly vyhodnoceny jako v pořádku.<br>Zdá se, že návrh na povolení my mohl u soudu obstát.'


    }

}