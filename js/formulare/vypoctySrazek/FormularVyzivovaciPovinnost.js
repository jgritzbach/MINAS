
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

        this._uchopKolonky()                                // uchopíme všechny elementy <select> k vyplnění
        this._nastavKolonky()
    }


    _uchopKolonky(){
        
        // na stránce uchopí patřičné kolonky dle jejich id a uloží je do vnitřních proměnných formuláře

        this.kolonkaPocetVyzivovanychOsob = document.getElementById("pocet-vyzivovanych-osob-dluznika")     // počet vyživovaných osob ve společné domácnosti
        this.kolonkaMesicniVyzivne = document.getElementById("mesicni-vyzivne")     // výživné stanovené soudem (typicky na děti mimo společnou domácnost)
        this.kolonkaDluzneVyzivne = document.getElementById("dluzne-vyzivne")       // dluh na výživném stanoveném soudem
        
        this.vsechnyKolonky = [this.kolonkaPocetVyzivovanychOsob, this.kolonkaMesicniVyzivne, this.kolonkaDluzneVyzivne,]
    }

    
    pocetOsob(){
        return parseInt(this.kolonkaPocetVyzivovanychOsob.value) || 0
    }

    mesicniVyzivne(){
        return parseFloat(this.kolonkaMesicniVyzivne.value) || 0
    }

    dluzneVyzivne(){
        return parseFloat(this.kolonkaDluzneVyzivne.value) || 0
    }


    osetrenyNavrat(){}



    _nastavKolonky(){
        // všem <input> kolonkám s počty nezabavitelných osob a výší výživného nastaví reakci na změnu

        for (const kolonka of this.vsechnyKolonky){       // všem kolonkám s vyživovanými osobami a výživným
             
            kolonka.addEventListener('change', () =>{               // nastaví reakci na změnu
                if (parseFloat(kolonka.value) < 0) {                // nejsou povolena záporná čísla
                    kolonka.value = 0                               // hodnota je vždy alespoň nula
                }
            })
        }
    }





}

