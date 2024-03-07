
class FormularVyzivovacichPovinnosti extends BaseFormular{

    // Formulář slouží pro manipulaci s kolonkami vyživovacích povinností dlužníka
    // Neprovádí žádné výpočty, o to se stará VypoctySrazekManager
   
    constructor(){

        super()

        this._uchopPolozky()                // uchopíme všechny elementy (divy) položek vyživovacích povinností dlužníka
        this._nastavKolonky()

        super._nastavNapovedy(this.vsechnyPolozky.polozky, TextyVyzivovaneOsoby)
        
    }

    _uchopPolozky(){
        
        // na stránce uchopí patřičné položky (divy) dle jejich id a uloží je do vnitřních proměnných formuláře

        this.polozkaPocetVyzivovanychOsob = new PolozkaFormulare("pocet-vyzivovanych-osob-dluznika")     // počet vyživovaných osob ve společné domácnosti
        this.polozkaMesicniVyzivne = new PolozkaFormulare("mesicni-vyzivne")     // výživné stanovené soudem (typicky na děti mimo společnou domácnost)
        this.polozkaDluzneVyzivne = new PolozkaFormulare("dluzne-vyzivne")       // dluh na výživném stanoveném soudem
        
        this.vsechnyPolozky = new SkupinaPolozekFormulare('vsechny-polozky', [
            this.polozkaPocetVyzivovanychOsob, 
            this.polozkaMesicniVyzivne, 
            this.polozkaDluzneVyzivne,])
    }

    
    get pocetOsob(){
        return parseInt(this.polozkaPocetVyzivovanychOsob.kolonka.value) || 0
    }

    get mesicniVyzivne(){
        return parseFloat(this.polozkaMesicniVyzivne.kolonka.value) || 0
    }

    get dluzneVyzivne(){
        return parseFloat(this.polozkaDluzneVyzivne.kolonka.value) || 0
    }


    _nastavKolonky(){
        // všem <input> kolonkám s počty nezabavitelných osob a výší výživného nastaví reakci na změnu

        for (const polozka of this.vsechnyPolozky.polozky){       // všem kolonkám s vyživovanými osobami a výživným
            
            const kolonka = polozka.kolonka
            kolonka.addEventListener('change', () =>{               // nastaví reakci na změnu
                if (parseFloat(kolonka.value) < 0) {                // nejsou povolena záporná čísla
                    kolonka.value = 0                               // hodnota je vždy alespoň nula
                }
            })
        }
    }





}

