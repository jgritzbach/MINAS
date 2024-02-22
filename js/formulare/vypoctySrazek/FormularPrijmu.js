class FormularPrijmu{

    // Tento formulář bude sloužit k zadávání dat o příjmech dlužníka.
    // Bude se zde vyplňovat typ příjmu a jeho výše
    // To samo ještě stačí na výpočet nezabavitelné částky a contrario k určení výše srážek
    // Od toho se totiž ještě budou odečítat případné vyživovací povinnosti dlužníka, jsou-li nějaké
    // Na což bude samostatný formulář
    // Nebude-li ve formuláři vyživovacích povinností nic vyplněno, má se za to, že žádné nejsou

    // V budoucnu možná přidám možnost, že se bude vyplňovat plátce příjmu, což je údaj, který v aplikaci může být dále využíván
    // zatím zde ještě plátce příjmů vyplnit nejde
    // vyplnění plátce příjmu nebude povinné
    // k dosazení zaměstavatele půjde časem využít AresApiClient - postačí IČO a dosadí se všechny údaje z ARES
    
    


    
    constructor(){

        this._nastavPovoleneVolby()                         // povolené volby jsou 'prázdné', 'v pořádku', 'diskutabilní' a 'vadné'
        this._uchopKolonky()                                // uchopíme všechny elementy <select> k vyplnění
        this._nastavKolonky()                               // a nastavíme jim vše potřebné
        this._propisSoucetPrijmu()
    }


    getSoucetPrijmu(){
        // vrátí číselný součet všech hodnot z kolonek pro výši vlastních příjmů (nezapočítávají se příjmy od 3. osob z darů)
        return parseFloat(this.kolonkaSoucetVlastnichPrijmu.value) || 0 // nemusíme vždy znovu provádět součet, protože ten se při každé změně už stejně propsal do kolonky
    }

    getPrijemOdTretiOsoby(){
        // vrátí číselnou výši daru od 3. osoby
        return parseFloat(this.kolonkaVyseDaru.value) || 0 // nemusíme vždy znovu provádět součet, protože ten se při každé změně už stejně propsal do kolonky
    }

    getTypPrijmuOdTretiOsoby(){
        // vrátí vyplněnou textovou hodnotu typu příjmu od 3. osoby - "darovací smlouva" anebo "smlouva o důchodu"
        const volba = this.kolonkaTypDaru.options[this.kolonkaTypDaru.selectedIndex]
        return volba.innerText.toLowerCase()
    }

    _propisSoucetPrijmu(){
        // propíše vypočítaný součet příjmů do <html> kolonky určené k zobrazení tohoto součtu
        this.kolonkaSoucetVlastnichPrijmu.value = this.vypoctiSoucetPrijmu()
    }

    vypoctiSoucetPrijmu(){
        // Sečte všechny vyplněné vlastní příjmy dlužníka jako číselné hodnoty a vrátí je
        
        const soucet = this.vsechnyKolonkyVysePrijmu.reduce(
            
            (soucet, kolonka) => {
                const vysePrijmu = parseFloat(kolonka.value) || 0   // není-li nic vyplněno, je výsledkem 0
                return soucet + vysePrijmu
            }
        ,0)

        return soucet
    }

    

    _nastavKolonky(){
        // všem <select> kolonkám typu příjmu nastaví jako přípustné volby [mzda, zisk OSVČ, důchod atd...]
        // všem <input> kolonkám s výší příjmu nastaví reakci na změnu

        for (const kolonka of this.vsechnyKolonkyTypyPrijmu){       // všem <select> typu příjmu
            this._nastavVolby(kolonka)                              // nastaví přípustné <option>
        }

        for (const kolonka of [...this.vsechnyKolonkyVysePrijmu, this.kolonkaVyseDaru]){       // všem <input> s výší příjmu (a to i u daru)
            kolonka.addEventListener('change', () =>{               // nastaví reakci na změnu
                if (parseFloat(kolonka.value) < 0) {                    // nejsou povolena záporná čísla
                    kolonka.value = 0                                   // hodnota je vždy alespoň nula
                }
                this._propisSoucetPrijmu()                               // a jakákoliv změna ihned provede průpis součtu do patřičné kolonky
            })
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
            VALUE: 'jiny-zabavitelny',
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

        // Součet příjmů - průpis
        this.kolonkaSoucetVlastnichPrijmu = document.getElementById("soucet-vlastnich-prijmu-dluznika")

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
