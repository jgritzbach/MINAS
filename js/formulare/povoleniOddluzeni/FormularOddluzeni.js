class FormularOddluzeni{

    // Úkolem této třídy je uchopit elementy z html stránky, které slouží jako formulář náležitostí návrhu na oddlužení
    // Tyto náležitosti má umět vyhodnotit a vrátit výsledný stav
    // Sama o sobě tato třída nic nikam nevypisuje, k tomu může sloužit nějaký její manager

    constructor(){

        this._uchopKolonky()
        this._nastavKolonky()
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

        selectElement.setAttribute('zaskrtnuti', Konstanty.volbyValues['PRAZDNE'])

    }
    
    _nastavReakciNaVolbu(selectElement){
        
        // Nastaví vybranému <select> reakci na zvolení některé z option
        // reakcí je přepis té části <select>.ClassList, která se týká barvy (o faktické přebarvení se stará CSS)
        
        selectElement.addEventListener('change', () =>{

            const novaVolba = selectElement.options[selectElement.selectedIndex].value  // namísto toho uchopíme zvolený <option>.value
            selectElement.setAttribute('zaskrtnuti', novaVolba)

        })

    }

    // Pomocné vyhodnocovací metody - 
    // formulář umí odpovídat na dotazy stran vyplněných hodnot svých kolonek.
    // odpovídá však jen true/false a vůbec se nestará o to, proč to chce někdo vědět a co s tím udělá (o vyhodnocení se postará manažer)

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