
class FormularVyzivovacichPovinnosti{

    // Formulář slouží pro manipulaci s kolonkami vyživovacích povinností dlužníka
    // Neprovádí žádné výpočty, o to se stará VypoctySrazekManager
    // Zákon rozlišuje vyživované osoby ve společné domácnosti a výživné stanovené soudem
    // Vyživované osoby ze zákona - to je typicky manžel(ka) a děti ve společné domácnosti. Striktně vzato společná domácnost není přímo podmínkou
    // Postačí, že vyživovací povinnost dlužníka existuje a nebyla soudně upravena. Za každou takovou osobu se zvyšuje nezabavitelná částka
    // Naproti tomu jsou osoby, ke kterým bylo výživné stanoveno soudem (typicky na děti mimo společnou domácnost)
    // U druhých jmenovaných se nezvyšuje nezabavitelná částka, ale ze sražených částek se přednostně hradí stanovené výživné
    // ještě před stanoveným výživným se ale hradí případný dluh na tomto stanoveném výživném
    // vyživovací povinnost ze zákona se navzájem vylučuje s povinností stanovenou soudem - vůči jedné osobě může být jedno nebo druhé

    constructor(){

        this._uchopPolozky()                // uchopíme všechny elementy (divy) položek vyživovacích povinností dlužníka
        this._nastavKolonky()

        // this.polozkaPocetVyzivovanychOsob.nastavNapovedu(this.polozkaPocetVyzivovanychOsob.popisek, "<p>K vyživované osobě se buďto počítá zákonná vyživovací povinnost, anebo je soudem urřené výživné. Vzájmeně se to vylučuje.</p>")
        
    }

    _uchopPolozky(){
        
        // na stránce uchopí patřičné položky (divy) dle jejich id a uloží je do vnitřních proměnných formuláře

        this.polozkaPocetVyzivovanychOsob = new PolozkaFormulare("pocet-vyzivovanych-osob-dluznika")     // počet vyživovaných osob ve společné domácnosti
        this.polozkaMesicniVyzivne = new PolozkaFormulare("mesicni-vyzivne")     // výživné stanovené soudem (typicky na děti mimo společnou domácnost)
        this.polozkaDluzneVyzivne = new PolozkaFormulare("dluzne-vyzivne")       // dluh na výživném stanoveném soudem
        
        this.vsechnyPolozky = [this.polozkaPocetVyzivovanychOsob, this.polozkaMesicniVyzivne, this.polozkaDluzneVyzivne,]
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

        for (const polozka of this.vsechnyPolozky){       // všem kolonkám s vyživovanými osobami a výživným
            
            const kolonka = polozka.kolonka
            kolonka.addEventListener('change', () =>{               // nastaví reakci na změnu
                if (parseFloat(kolonka.value) < 0) {                // nejsou povolena záporná čísla
                    kolonka.value = 0                               // hodnota je vždy alespoň nula
                }
            })
        }
    }





}

