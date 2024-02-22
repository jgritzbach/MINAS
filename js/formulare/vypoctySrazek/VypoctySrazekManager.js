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
        
        this.divVypocetSrazek = document.getElementById("div-vypocet-srazek")
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
        // Vypíše do patřičného divu údaje o výši srážek z příjmu dlužníka a o výši nezabavitelné částky
        // k samotným výpočtům používá nezávislý nástroj výpočtu srážek

        const p = this.formularPrijmu
        const v = this.formularVyzivovacichPovinnosti

        const prijmy = p.getSoucetPrijmu()
        const osoby = v.pocetOsob()
        const srazka = vypocetSrazek.vypocitatSrazku(prijmy, osoby)     // díky uložení výše srážky do mezivýpočtu ušetříme jeden výpočet navíc - výpočet srážek provádí samostatná třída (nástroj)
        const zustatek = prijmy - srazka
        let text = `<p>Z vlastních příjmů dlužníka lze provést srážku: ${srazka} Kč.</p>
                      <p>Dlužníku měsíčně zůstane ${zustatek} Kč.</p>`

        if (p.getPrijemOdTretiOsoby() > 0){

            let typPrijmuOdTretiOsoby = p.getTypPrijmuOdTretiOsoby()
            typPrijmuOdTretiOsoby = typPrijmuOdTretiOsoby? typPrijmuOdTretiOsoby : `smlouva se třetí osobou`
            let popisDaru = `, který dlužníku zajišťuje uzavřená ${typPrijmuOdTretiOsoby},`

            text += `<p>Příjem ve výši ${p.getPrijemOdTretiOsoby()} Kč${popisDaru} je dlužník povinnen vydat celý (nezkrácený) ve prospěch majetkové podstaty.</p>`

            
        }
 
        
        this.divVypocetSrazek.innerHTML = text
    }

}