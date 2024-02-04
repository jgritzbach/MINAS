class FormularOddluzeni{

    // Úkolem této třídy je uchopit elementy z html stránky, které slouží jako formulář náležitostí návrhu na oddlužení
    // Tyto náležitosti má umět vyhodnotit a vrátit výsledný stav
    // Sama o sobě tato třída nic nikam nevypisuje, k tomu může sloužit nějaký její manager

    constructor(){

        this._uchopKolonky()
        this._nastavKolonky()
    }

    _nastavKolonky(){
        // všem <selection> kolonkám nastaví jako přípustnou volbu zaškrtávací možnosti v pořádku / diskutabilní / vadné

        for (const kolonka of this.kolonky){
            this._vytvorZaskrtavaciVolbu(kolonka)
            this._nastavReakciNaVolbu(kolonka)
        }

    }

    _uchopKolonky(){
        
        // na stránce uchopí patřičné kolonky (elementy <select>) dle jejich id a uloží je do vnitřních proměnných formuláře

        // Obecné náležitosti
        this.kolonkaPlneMoci = document.getElementById("nalezitosti-plne-moci")
        this.kolonkaFormaPodani = document.getElementById("nalezitosti-formy-podani")
        this.kolonkaTvrzeniOUpadku = document.getElementById("tvrzeni-o-upadku")
        this.kolonkaMistniPrislusnost = document.getElementById("mistni-prislusnost")

        // Přílohy insolvenčního návrhu
        this.kolonkaSeznamMajetku = document.getElementById("seznam-majetku")
        this.kolonkaSeznamZamestnancu = document.getElementById("seznam-zamestnancu")
        this.kolonkaListinyDokladajiciUpadek = document.getElementById("listiny-dokladajici-upadek")

        // Přílohy návrhu na povolení oddlužení
        this.kolonkaProhlaseniOPouceni = document.getElementById("prohlaseni-o-pouceni")
        this.kolonkaSoucasnePrijmy = document.getElementById("priloha-soucasne-prijmy")
        this.kolonkaMinulePrijmy = document.getElementById("prijmy-za-12-mesicu")
        this.kolonkaProhlaseniManzeluOMajetku = document.getElementById("prohlaseni-manzelu-o-majetku")

        // Další přílohy
        this.kolonkaDarovaciSmlouva = document.getElementById("priloha-darovaci-smlouva")
        this.kolonkaRozsudekOVyzivnem = document.getElementById("priloha-rozsudek-o-vyzivnem")

        this.kolonky = [
            this.kolonkaPlneMoci,
            this.kolonkaFormaPodani,
            this.kolonkaTvrzeniOUpadku,
            this.kolonkaMistniPrislusnost,

            this.kolonkaSeznamMajetku,
            this.kolonkaSeznamZamestnancu,
            this.kolonkaListinyDokladajiciUpadek,

            this.kolonkaProhlaseniOPouceni,
            this.kolonkaSoucasnePrijmy,
            this.kolonkaMinulePrijmy,
            this.kolonkaProhlaseniManzeluOMajetku, 

            this.kolonkaDarovaciSmlouva,
            this.kolonkaRozsudekOVyzivnem,
        ]
    }

    _vytvorZaskrtavaciVolbu(selectElement){

        // nastaví zadanému <select> jeho přípustné zaškrtávací <options>
        
        for (const hodnota of Object.entries(Konstanty.volbyValues)){   // k nastavení innerText a value nám pomůžou definované konstanty
            const option = document.createElement('option')             // vytvoříme nový option
            option.value = hodnota[1]                                   // jeho value mu nastavíme dle definovaných konstant
            option.innerText = Konstanty.volbyTexty[hodnota[0]]         // a jeho vnitřní text pomocí téhož klíče dle definovaných konstant
            selectElement.appendChild(option)                           // a hotový <option> přiřadíme do <select>
        }

        selectElement.classList.add(Konstanty.volbyValues['PRAZDNE']) // <select> nastavíme výchozí volbu (tj. nic nevybráno)
    }
    
    _nastavReakciNaVolbu(selectElement){
        
        // Nastaví vybranému <select> reakci na zvolení některé z option
        // reakcí je přepis té části <select>.ClassList, která se týká barvy (o faktické přebarvení se stará CSS)
        
        selectElement.addEventListener('change', () =>{

            for (const volba of Object.values(Konstanty.volbyValues)){       // iterujeme napříč values dle definovaných konstant typů zaškrtávacích voleb

                if (selectElement.classList.contains(volba)){       // až narazíme na tu, která se vyskytuje v současném <select>.classList
                    
                    selectElement.classList.remove(volba)           // tu odstraníme
                    const novaVolba = selectElement.options[selectElement.selectedIndex].value  // namísto toho uchopíme zvolený <option>.value
                    selectElement.classList.add(novaVolba)     // a ten vložíme do <select>.classList namísto původní volby
                    break       // a můžeme rovnou skončit (nepředpokládá se, že by <select> mohl mít více zaškrtnutých voleb najednou)
                } 
            }
                
        })
    }

    vyhodnotKolonky(){

        // vyhodnotí vnitřní kolonky formuláře a vrátí stav reprezentovaný číslem
        
        // Přednost má vada plné moci - nnepřihlíží se a nelze napravit
        // Poté je forma podání - zpracovatel má DS, takže má podat elektronicky, neučiní-li, výzva k opravě. Neopraví-li, odmítne se 
        // Poté je tvrzení o úpadku - nedostatečné tvrzení o úpadku je důvodem k odmítnutí a nelze to napravit. Ač se to zdá zvláštní, odmítnutí zde má přednost i před vyslovením místní nepříslušnosti
        // místní příslušnost - není-li soud místně příslušný, vysloví nepříslušnost a postoupí, zbytkem návrhu se vůbec nezabývá 

        // Odtud dále nelze kvalifikovaně posoudit, co se stane, dokud se nevyplní všechno

        // vady příloh insolvenčního návrhu - lze to napravit na výzvu - nedoplní-li odmítne se, protože insolvnenčí návrh nelze projednat
        // vady příloh návrhu na oddlužení - lze to napravit na výzvu - nedoplní-li odmítne se návrh na povolení oddlužení, ale je-li IN v pořádku, lze IN projednat - rozhodne se o úpadku dlužníka buďto se řízení zastaví, nebo se prohlásí konkurs

        // další přílohy - týkají se pouze oddlužení, a nejsou vyžadovány vždy - jsou-li vyžadovány, postupuje se dle klasických příloh oddlužení

        let hodnota, vadne, diskutabilni

        // iterace skrze jednotlivé kolonky
        for (const kolonka of this.kolonky){

            hodnota = kolonka.value

            if (hodnota === Konstanty.volbyValues['PRAZDNE']){      // pokud někde absentuje vyplnění, rovnou víme, že nelze vyhodnotit
                return Konstanty.stavy['NECO_CHYBI'] 
            } else if (hodnota === Konstanty.volbyValues['VADNE']){
                vadne = true;
            } else if (hodnota === Konstanty.volbyValues['DISKUTABILNI']){
                diskutabilni = true;
            }
        }   

        // jak dopadla iterace?
        if (vadne){
            return Konstanty.stavy['NECO_VADNE'] 
        }
        if (diskutabilni){
            return Konstanty.stavy['NECO_DISKUTABILNI']
        }
        return Konstanty.stavy['VSE_OK']
    }
        



}