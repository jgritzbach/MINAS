class FormularPrijmu{

    // Tento formulář bude sloužit k zadávání dat o příjmech dlužníka.
    // Bude se zde vyplňovat typ příjmu a jeho výše
    // Bude se vyplňovat zaměstnavatel, což ale nebude povinné
    // k dosazení zaměstavatele půjde využít AresApiClient - postačí IČO a dosadí se všechny údaje z ARES
    // To samo stačí na výpočet nezabavitelné částky a contrario k určení výše srážek
    // Od toho se ještě budou odečítat případné vyživovací povinnosti dlužníka, jsou-li nějaké
    // Nebude-li ve formuláři vyživovacích povinností nic vyplněno, má se za to, že žádné nejsou
    // Bude-li něco vyplněno, výpočet srážek bude o to ponížen
    
    constructor(){

        this._nastavPovoleneVolby()                         // povolené volby jsou 'prázdné', 'v pořádku', 'diskutabilní' a 'vadné'
        this._uchopKolonky()                                // uchopíme všechny elementy <select> k vyplnění
        this._nastavKolonky()                               // a nastavíme jim vše potřebné
    }

    _nastavKolonky(){
        // všem <select> kolonkám nastaví jako přípustnou volbu zaškrtávací možnosti v pořádku / diskutabilní / vadné
        // a nastaví jim také reakci na změnu

        for (const kolonka of this.vsechnyKolonkyTypyPrijmu){
            this._nastavVolby(kolonka)
            this._nastavReakciNaVolbu(kolonka)
        }

    }

    _nastavVolby(selectElement){

        // nastaví zadanému <select> jeho přípustné zaškrtávací <options>

        for (const typPrijmu of this.povoleneVolby){            // iterujeme skrze vlastnosti všech přípustných hodnot (ty jsou napevno definovány v instanční proměnné)

            const option = document.createElement('option')      // vytvoříme nový element <option> (v každé iteraci vytváříme jinou přípustnou hodnotu)
            option.value = typPrijmu.VALUE                       // a přiřadíme jí předdefinovaný value
            option.innerText = typPrijmu.TEXT                    // a innerText

            selectElement.appendChild(option)                           // hotový <option> vložíme do předaného <select>

        }

    }
    
    _nastavReakciNaVolbu(selectElement){
        
        // Nastaví vybranému <select> reakci na zvolení některé z option
        // reakcí je přepis té části <select>.ClassList, která se týká barvy (o faktické přebarvení se stará CSS)
        
        selectElement.addEventListener('change', () =>{

            // zatím zde není žádný následek change eventu

        })

    }




    _nastavPovoleneVolby(){

        // nastaví si vnitřní konstantní hodnoty pro <option> elementy - jejich innerTexty a values
        // právě ty jsou později používány pro nastavení přípustných <option> a porovnávání hodnot <selectu>

        
        this.optionPrazdne = {
            VALUE: 'nevybrano',
            TEXT: "",
        }

        this.optionMzda = {
            VALUE: 'mzda',
            TEXT: "mzda",
        }

        this.optionOSVC= {
            VALUE: 'osvc',
            TEXT: "zisk OSVČ",
        }

        this.optionDuchodStarobni = {
            VALUE: 'duchod-st',
            TEXT: "důchod starobní",
        }

        this.optionDuchodInvalidniPrvniSt = {
            VALUE: 'duchod-inv-1',
            TEXT: "inv. důchod 1.st.",
        }

        this.optionDuchodInvalidniDruhySt = {
            VALUE: 'duchod-inv-2',
            TEXT: "inv. důchod 2.st.",
        }

        this.optionDuchodInvalidniTretiSt = {
            VALUE: 'duchod-inv-3',
            TEXT: "inv. důchod 3.st.",
        }

        this.optionRodicovskyPrispevek = {
            VALUE: 'rodicovsky-prispevek',
            TEXT: "rodičovský příspěvek",
        }

        this.optionDPP = {
            VALUE: 'dpp',
            TEXT: "odměna z DPP",
        }

        this.optionJine = {
            VALUE: 'jine',
            TEXT: "jiný zabavitelný",
        }

        // ačkoliv hodnoty jednotlivých voleb jsou přímo dostupné, pro snazší hromadné iterace uchováváme odkazy na ně také 
        this.povoleneVolby = [this.optionPrazdne, this.optionMzda, this.optionOSVC, this.optionDuchodStarobni, this.optionDuchodInvalidniPrvniSt,
                            this.optionDuchodInvalidniDruhySt, this.optionDuchodInvalidniTretiSt, this.optionRodicovskyPrispevek, 
                            this.optionDPP, this.optionJine,
                           ] // hromadně v poli

    }



    _uchopKolonky(){
        
        // na stránce uchopí patřičné kolonky (elementy <select>) dle jejich id a uloží je do vnitřních proměnných formuláře

        // Typy příjmů
        this.kolonkaPrijem1Typ = document.getElementById("typ-prijmu-1")
        this.kolonkaPrijem2Typ = document.getElementById("typ-prijmu-2")
        this.kolonkaPrijem3Typ = document.getElementById("typ-prijmu-3")

        // Výše příjmů
        this.kolonkaPrijem1Vyse = document.getElementById("vyse-prijmu-1")
        this.kolonkaPrijem2Vyse = document.getElementById("vyse-prijmu-2")
        this.kolonkaPrijem3Vyse = document.getElementById("vyse-prijmu-3")

        // Příjem od 3. osoby
        this.kolonkaTypDaru= document.getElementById("typ-daru")
        this.kolonkaVyseDaru= document.getElementById("vyse-daru")
        
        // Logické Seskupení některých kolonek
        this.vsechnyKolonkyVysePrijmu = [
            this.kolonkaPrijem1Vyse,
            this.kolonkaPrijem2Vyse,
            this.kolonkaPrijem3Vyse,
        ]

        this.vsechnyKolonkyTypyPrijmu = [
            this.kolonkaPrijem1Typ,
            this.kolonkaPrijem2Typ,
            this.kolonkaPrijem3Typ,
        ]
        
    }

}
