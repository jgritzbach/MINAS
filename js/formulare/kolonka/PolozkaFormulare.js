class PolozkaFormulare{
    // třída reprezentuje položku nějakého formuláře
    // sestává na prvním místě z nějaké kolonky, kam se něco vyplňuje, typicky z nějakého elementu <select> nebo <input>
    // současně však také může mít přidružený label
    // a také může mít přidruženou nápovědu, kterou lze zobrazit nějakou událostí.

    constructor(obecnyNazev){

        // obecnyNazev - to bude představovat část názvu společnou jako pro položku, tak pro kolonku a label
        // rozdíl pak bude v tom, že položka a kolonka budou mít každá jiné slovo před touto společnou frází
        // například pokud obecnyNazev bude "nalezitosti-plne-moci"
        //tak objekt polozkyFormulare uz sam hned vi, ze 

        const idPolozky = 'polozka-' + obecnyNazev
        const idKolonky = 'kolonka-' + obecnyNazev

        this.polozka = document.getElementById(idPolozky)
        this.kolonka = document.getElementById(idKolonky)
        this.popisek = document.querySelector(`label[for="${idKolonky}"]`)      // příslušný label pro kolonku, pokud existuje

    }

    get polozka(){
        return this._polozka
    }

    set polozka(div){
        this._polozka = div
    }

    get kolonka(){
        return this._kolonka
    }

    set kolonka(kolonkaElement){
        this._kolonka = kolonkaElement
    }

    get popisek(){
        return this._popisek
    }

    set popisek(elementLabel){
        this._popisek = elementLabel
    }




}