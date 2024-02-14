class VypoctySrazekManager{
    // třída slouží pro manipulaci s formuláři příjmů a vyživovaných osob
    // na jejich základě umí spočítat výše srážek proveditelných z příjmů
    // formuláře sám si jen pamatují, které kolonky jsou jejich, co se v nich může vyplňovat, a umí posoudit, co v nich je
    // vůbec se však nestarají o to, proč by to někdo chtěl vědět, a nejsou nijak iniciativní.
    // Pokyny k vyhodnocení jim zadává tento manžer, stejně tak jako vyvození důsledků takového vyhodnocení





    constructor(){

        // this.divVyhodnoceniFormulare = document.getElementById("div-vyhodnoceni-formulare")

        this.formularPrijmu = new FormularPrijmu()
        this.formularVyzivovacichPovinnosti = new FormularVyzivovacichPovinnosti()
        
        this._pridatUdalostVyhodnoceni()

    }



    _pridatUdalostVyhodnoceni(){
        // ke každé relevantní kolonce formuláře příjmů nebo vyživovacích povinností se přidá další change event listener.
        // právě ten zavolá přepočet srážek při jakékoliv změně

        const fPrijmy = this.formularPrijmu
        const fVyziv = this.formularVyzivovacichPovinnosti

        // Zde určíme, kteréthis.vypocty kolonky jsou způsobilé vyvolat přepočet
        const cile = [... fPrijmy.vsechnyKolonkyVysePrijmu, fPrijmy.kolonkaVyseDaru, ...fVyziv.vsechnyKolonky]

        for (const kolonka of cile){
            kolonka.addEventListener('change', () => this.vypisVyhodnoceniFormulare())
        }


    }

    vypisVyhodnoceniFormulare(){
        alert(this.vypocitatSrazku())
    }



    vypocitatSrazku(){
        // Tato metoda ze všech údajů o příjmech dlužníka vypočítá výši zákonné srážky
        // relevantní input data se převezmou z patřičnýc kolonek v html formulářích

        const p = this.formularPrijmu
        const v = this.formularVyzivovacichPovinnosti

        // pokud se změní zákon, mělo by stačit provést změnu zde
        const zivotniMinimumJednotlivce = 4860              // tuto výši fixně stanoví nařízení vlády 595/2006 Sb.
        const normativniNakladyNaBydleni = 15597                // Upravuje § 2 písm. a) nařízení vlády, kterým se pro účely příspěvku na bydlení ze státní sociální podpory pro rok xy. Číslo nařízení se mění každý rok (např. v roce 2019 to bylo č. 320/2018 Sb.). 
        const soucetMinimaANakladu = zivotniMinimumJednotlivce + normativniNakladyNaBydleni

        const nezabavitelnaCastka = 2/3 * soucetMinimaANakladu
        const zaVyzivovanouOsobu = 1/3 * nezabavitelnaCastka

        const zaVyzivovaneOsobyCelkem = v.pocetOsob()
        const celkemNezabavitelneNezaokrouhlene = nezabavitelnaCastka + zaVyzivovaneOsobyCelkem
        return        Math.ceil(celkemNezabavitelneNezaokrouhlene)


    }


}