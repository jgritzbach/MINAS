class FormularOddluzeni{

    // Úkolem této třídy je uchopit elementy z html stránky, které slouží jako formulář náležitostí návrhu na oddlužení
    // Tyto náležitosti má umět vyhodnotit a vrátit výsledný stav
    // Sama o sobě tato třída nic nikam nevypisuje, k tomu může sloužit nějaký její manager

    constructor(){

        this._uchopKolonky()
        this._nastavKolonky()
    }


    get manager(){
        return this._manager
    }

    set manager(manager){
        this.manager = manager
    }
   

    _nastavKolonky(){
        // všem <select> kolonkám nastaví jako přípustnou volbu zaškrtávací možnosti v pořádku / diskutabilní / vadné
        // a nastaví jim také reakci na změnu

        for (const kolonka of this.vsechnyKolonky){
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

        // Logické Seskupení některých kolonek
        this.vsechnyKolonky = [
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
        
        this.prilohyInsolvencnihoNavrhu = [
            this.kolonkaSeznamMajetku,
            this.kolonkaSeznamZamestnancu,
            this.kolonkaListinyDokladajiciUpadek,
        ]

        this.prilohyNavrhuNaPovoleniOddluzeni = [
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

    
    // Vyhodnocení formuláře dle pevně daných pravidel (tato pravidla vyplývají přímo z insolvenčního zákona, jsou proto velmi hardcodové)

    vyhodnotKolonky(){

        // vyhodnotí vnitřní kolonky formuláře a vrátí stav reprezentovaný číslem
        const K = Konstanty

        // Přednost má vada plné moci - nepřihlíží se a nelze napravit, ani se nemusíme dívat dál
        if (this._jeVadne(this.kolonkaPlneMoci)){
            return K.stavy['VADNE_PLNA_MOC']
        }

        // Poté je forma podání - zpracovatel má DS, takže má podat elektronicky, neučiní-li, výzva k opravě. Neopraví-li, odmítne se 
        if (this._jeVadne(this.kolonkaFormaPodani)){
            return K.stavy['VADNE_FORMA_PODANI']
        }
        
        // Poté je tvrzení o úpadku - nedostatečné tvrzení o úpadku je důvodem k odmítnutí a nelze to napravit. Ač se to zdá zvláštní, odmítnutí zde má přednost i před vyslovením místní nepříslušnosti
        if (this._jeVadne(this.kolonkaTvrzeniOUpadku)){
            return K.stavy['VADNE_TVRZENI_O_UPADKU']        
        }

        // místní příslušnost - není-li soud místně příslušný, vysloví nepříslušnost a postoupí, zbytkem návrhu se vůbec nezabývá 
        if (this._jeVadne(this.kolonkaMistniPrislusnost)){
            return K.stavy['VADNE_MISTNI_PRISLUSNOST']        
        }

        // vady příloh insolvenčního návrhu - lze to napravit na výzvu - nedoplní-li odmítne se, protože insolvnenčí návrh nelze projednat, a soud se návrhem na oddlužení nezabývá
        if (this._jeVadnaNejakaPrilohaInsolvencnihoNavrhu()){
            return K.stavy['VADNE_PRILOHY_INSOLVENCNIHO_NAVRHU']        
        }

        // vady příloh návrhu na oddlužení - lze to napravit na výzvu - nedoplní-li odmítne se návrh na povolení oddlužení, ale je-li IN v pořádku, lze IN projednat - rozhodne se o úpadku dlužníka buďto se řízení zastaví, nebo se prohlásí konkurs
        if (this._jeVadnaNejakaPrilohaNavrhuNaPovoleniOddluzeni()){
            return K.stavy['VADNE_PRILOHY_NAVRHU_NA_ODDLUZENI']
        }

        // Odtud dále nelze kvalifikovaně posoudit, co se stane, dokud se nevyplní všechno
        if (this._jeNevyplneneNecoZ(this.vsechnyKolonky)){
            return K.stavy['NECO_NEVYPLNENE']
        }

        // je-li nkěterá kolonka diskutabilní, je postup nejistý
        if (this._jeDiskutabilniNecoZ(this.vsechnyKolonky)){
            return K.stavy['NECO_DISKUTABILNI']
        }

        // nenastala-li žádná z přednostních podmínek, je vše v pořádku
        return K.stavy['VSE_OK']
    }

    
    //  Pomocné vyhodnocovací metody - pro lepší čitelnost kódu hlavního vyhodnocování

    _jeNevyplnene(kolonka){
        // Vrací údaj o tom, zda daná kolonka je nevyplněná
        return kolonka.value === Konstanty.volbyValues['PRAZDNE']
    }

    _jeDiskutabilni(kolonka){
        // Vrací údaj o tom, zda daná kolonka má vyplněnou volbu 'diskutabilní'
        return kolonka.value === Konstanty.volbyValues['DISKUTABILNI']
    }

    _jeVadne(kolonka){
        // Vrací údaj o tom, zda daná kolonka má vyplněnou volbu 'vadné'
        return kolonka.value === Konstanty.volbyValues['VADNE']
    }

    _jeNecoZPredanychNejake(kolonky, callback){
        // Vrací údaj o tom, zda alespoň některá z předaných kolonek má pravdivý výsledek callbacku
        for (const kolonka of kolonky){
            if (callback(kolonka)){            // stačí jediný pravdivý callback a hned vracíme pravdu (iterace končí)
                return true
            }
        }
    }

    _jeNevyplneneNecoZ(kolonky){
        // Vrací údaj o tom, zda alespoň některá z předaných kolonek je nevyplněná
        return this._jeNecoZPredanychNejake(kolonky, this._jeNevyplnene)
    }

    _jeDiskutabilniNecoZ(kolonky){
        // Vrací údaj o tom, zda alespoň některá z předaných kolonek je diskutabilní
        return this._jeNecoZPredanychNejake(kolonky, this._jeDiskutabilni)
    }

    _jeVadneNecoZ(kolonky){
        // Vrací údaj o tom, zda alespoň některá z předaných kolonek je vadná
        return this._jeNecoZPredanychNejake(kolonky, this._jeVadne)
    }

    _jeVadnaNejakaPrilohaInsolvencnihoNavrhu(){
        // Vrací údaj o tom, zda některá z kolonek náležících mezi přílohy insolvenčního návrhu má vyplněnou volbu 'vadné'
        return this._jeVadneNecoZ(this.prilohyInsolvencnihoNavrhu)
        
    }

    _jeVadnaNejakaPrilohaNavrhuNaPovoleniOddluzeni(){
        // Vrací údaj o tom, zda některá z kolonek náležících mezi přílohy návrhu na povolení oddlužení má vyplněnou volbu 'vadné'
        return this._jeVadneNecoZ(this.prilohyNavrhuNaPovoleniOddluzeni)
    }
        
}