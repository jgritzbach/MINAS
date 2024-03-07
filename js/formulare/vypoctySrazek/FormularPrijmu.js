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
        this._uchopPolozky()                                // uchopíme všechny elementy <select> k vyplnění
        this._nastavKolonky()                               // a nastavíme jim vše potřebné
        this._propisSoucetVlastnichPrijmu()
    }


    get SoucetVlastnichPrijmu(){
        // vrátí číselný součet všech hodnot z kolonek pro výši vlastních příjmů (nezapočítávají se příjmy od 3. osob z darů)
        return parseFloat(this.polozkaSoucetVlastnichPrijmu.kolonka.value) || 0 // nemusíme vždy znovu provádět součet, protože ten se při každé změně už stejně propsal do kolonky
    }

    get vyseDaru(){
        // vrátí číselnou výši daru od 3. osoby
        return parseFloat(this.polozkaVyseDaru.kolonka.value) || 0 // nemusíme vždy znovu provádět součet, protože ten se při každé změně už stejně propsal do kolonky
    }

    get typDaru(){
        // vrátí vyplněnou textovou hodnotu typu příjmu od 3. osoby - "darovací smlouva" anebo "smlouva o důchodu"
        const kolonka = this.polozkaTypDaru.kolonka
        const volba = kolonka.options[kolonka.selectedIndex]
        return volba.innerText.toLowerCase()
    }

    _propisSoucetVlastnichPrijmu(){
        // propíše vypočítaný součet příjmů do <html> kolonky určené k zobrazení tohoto součtu
        this.polozkaSoucetVlastnichPrijmu.kolonka.value = this.vypoctiSoucetVlastnichPrijmu()
    }

    vypoctiSoucetVlastnichPrijmu(){
        // Sečte všechny vyplněné vlastní příjmy dlužníka jako číselné hodnoty a vrátí je
        
        const kolonky = this.vsechnyPolozkyVysePrijmu.polozky.map(polozka => polozka.kolonka)
        const soucet = kolonky.reduce(
            
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

        for (const polozka of this.vsechnyPolozkyTypPrijmu.polozky){       // všem <select> typu příjmu
            this._nastavVolby(polozka.kolonka)                              // nastaví přípustné <option>
        }


        for (const polozka of [...this.vsechnyPolozkyVysePrijmu.polozky, this.polozkaVyseDaru]){       // všem <input> s výší příjmu (a to i u daru)

            const kolonka = polozka.kolonka
            kolonka.addEventListener('change', () =>{               // nastaví reakci na změnu
                if (parseFloat(kolonka.value) < 0) {                    // nejsou povolena záporná čísla
                    kolonka.value = 0                                   // hodnota je vždy alespoň nula
                }
                this._propisSoucetVlastnichPrijmu()                               // a jakákoliv změna ihned provede průpis součtu do patřičné kolonky
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


    _uchopPolozky(){
        
        // na stránce uchopí patřičné položky (elementy <div>) dle jejich id a uloží je do vnitřních proměnných formuláře

        // Typy příjmů
        this.polozkaPrijem1Typ = new PolozkaFormulare("typ-prijmu-1")
        this.polozkaPrijem2Typ = new PolozkaFormulare("typ-prijmu-2")
        this.polozkaPrijem3Typ = new PolozkaFormulare("typ-prijmu-3")

        // Výše příjmů
        this.polozkaPrijem1Vyse = new PolozkaFormulare("vyse-prijmu-1")
        this.polozkaPrijem2Vyse = new PolozkaFormulare("vyse-prijmu-2")
        this.polozkaPrijem3Vyse = new PolozkaFormulare("vyse-prijmu-3")

        // Součet příjmů - průpis
        this.polozkaSoucetVlastnichPrijmu = new PolozkaFormulare("soucet-vlastnich-prijmu-dluznika")

        // Příjem od 3. osoby
        this.polozkaTypDaru= new PolozkaFormulare("typ-daru")
        this.polozkaVyseDaru= new PolozkaFormulare("vyse-daru")
        
        // Logické Seskupení některých položek
        this.vsechnyPolozkyVysePrijmu = new SkupinaPolozekFormulare('vsechny-polozky-vyse-prijmu', [
            this.polozkaPrijem1Vyse,
            this.polozkaPrijem2Vyse,
            this.polozkaPrijem3Vyse,
        ])

        this.vsechnyPolozkyTypPrijmu = new SkupinaPolozekFormulare('vsechny-polozky-typ-prijmu',[
            this.polozkaPrijem1Typ,
            this.polozkaPrijem2Typ,
            this.polozkaPrijem3Typ,
        ])
        
    }

}
