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

        // Zde určíme, které kolonky jsou způsobilé vyvolat přepočet
        const cile = [... fPrijmy.vsechnyKolonkyVysePrijmu, fPrijmy.kolonkaVyseDaru, ...fVyziv.vsechnyKolonky]

        for (const kolonka of cile){
            kolonka.addEventListener('change', () => this.vypisVyhodnoceniFormulare())
        }


    }

    vypisVyhodnoceniFormulare(){
        alert("Přepočítávám")
    }
}