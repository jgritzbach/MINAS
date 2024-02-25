class ManagerSrazek{
    // třída slouží pro manipulaci s formuláři příjmů a vyživovaných osob
    // na jejich základě umí spočítat výše srážek proveditelných z příjmů (respektive k tomu požívá samostatný nástroj)
    // formuláře sami si jen pamatují, které kolonky jsou jejich, co se v nich může vyplňovat, a umí posoudit, co v nich je
    // vůbec se však nestarají o to, proč by to někdo chtěl vědět, a nejsou nijak iniciativní.
    // Pokyny k vyhodnocení jim zadává tento manžer, stejně tak jako vyvození důsledků takového vyhodnocení



    constructor(formularPrijmu, formularVyzivovacichPovinnosti){

        this.formularPrijmu = formularPrijmu
        this.formularVyzivovacichPovinnosti = formularVyzivovacichPovinnosti
        
        this.divVypocetSrazek = document.getElementById("div-vypocet-srazek")
        this._pridatUdalostVyhodnoceni()

    }


    _pridatUdalostVyhodnoceni(){
        // ke každé relevantní kolonce formuláře příjmů nebo vyživovacích povinností se přidá další change event listener.
        // právě ten zavolá přepočet srážek při jakékoliv změně

        const p = this.formularPrijmu
        const v = this.formularVyzivovacichPovinnosti

        // Zde určíme, které kolonky jsou způsobilé vyvolat přepis textového výsledku
        const cile = [... p.vsechnyKolonkyVysePrijmu, p.kolonkaVyseDaru, p.kolonkaTypDaru, ...v.vsechnyKolonky]      // přepis textu vyvolá i změna typu daru, protože jeho označení se promítá do textu

        for (const kolonka of cile){
            kolonka.addEventListener('change', () => this._vypisVyhodnoceniPrijmu())
        }
    }

    _vypisVyhodnoceniPrijmu(){
        // Vypíše do patřičného divu údaje o výši nezabavitelné částky, výši srážek a zapodstatových pohledávek
        this.divVypocetSrazek.innerHTML = this._sestavTextProVyhodnoceniPrijmu()
    }

    _sestavTextProVyhodnoceniPrijmu(){
        // sestaví a vrátí text, který je určený k průpisu do patřičného divu
        // k samotným výpočtům používá nezávislý nástroj výpočtu srážek

        const p = this.formularPrijmu
        const v = this.formularVyzivovacichPovinnosti

        const prijmy = p.SoucetVlastnichPrijmu
        const osoby = v.pocetOsob
        const srazka = vypocetSrazek.vypocitatSrazku(prijmy, osoby)     // díky uložení výše srážky do mezivýpočtu ušetříme jeden výpočet navíc - výpočet srážek provádí samostatná třída (nástroj)
        let zustatek = prijmy - srazka

        if (!Number.isInteger(zustatek)){        // pokud náhodou byla zadána nějaká desetinná čísla, projeví se to v zustatku
            zustatek = zustatek.toFixed(2)      // a ten chceme zaokrouhlit na haléře
        }
        
        const prijmyZDaru = p.vyseDaru
        const celkovaSrazka = srazka + prijmyZDaru

        const pausalIS = 1089       // odměna a hotové výdaje insolvenčního správce vč. DPH

        let text = ""

        // textový popis vlastníchy příjmů
        if (prijmy > 0) {
            text += `<p>Dlužníku z vlastních příjmů měsíčně zůstane ${zustatek} Kč.</p>`    //text popisu zůstatku pro dlužníka
            
            let textSrazky              // text popisu výše srážek z vlastních příjmů
            if (srazka > 0){
                textSrazky = `lze provést srážku ${srazka} Kč.`
            } else {
                textSrazky = `nelze provést žádnou srážku.`
            }

            text += `<p>Z vlastních příjmů dlužníka ${textSrazky}</p>`      

        }
                      
        // text obohatíme o popis příjmů z daru, je-li nějaký
        if (prijmyZDaru){

            let typDaru = p.typDaru
            typDaru = typDaru? typDaru : `smlouva se třetí osobou`
            let popisDaru = `, který dlužníku zajišťuje uzavřená ${typDaru},`

            text += `<p>Příjem ve výši ${prijmyZDaru} Kč${popisDaru} je dlužník povinnen vydat celý (nezkrácený) ve prospěch majetkové podstaty.</p>`
        }

        // je-li z vlastních příjmů prováděna srážka a ještě k tomu má dlužník dar, zrekapitulujeme ještě jejich součet, ať je v tom jasno
        if (srazka && prijmyZDaru){    
            text += `<p>Celkem tak dlužník do majetkové podstaty odevzdá ${celkovaSrazka} Kč měsíčně.</p>`
        }

        // je celková proveditelná srážka vůbec větší, než je měsíční paušál IS?
        const popisPausaluIS = `měsíční paušál insolvenčního správce (záloha na jeho odměnu a hotové výdaje), jenž činí v případě dlužníka jednotlivce ${pausalIS} Kč vč. DPH, a který je třeba hradit přednostně.`

        if (celkovaSrazka > pausalIS){  // Pokud pokryjeme alespoň paušál IS
            text += `<p>Od této částky je třeba dále odečíst ${popisPausaluIS}</p>` // připíšeme to do textu a normálně pokračujeme dál
        } else {    // pokud však nepokryjeme ani paušál IS
            text += `<p>Tato částka nepokryje ani ${popisPausaluIS}<p>      
                     <p>Neprokáže-li dlužník soudu další příjmy, oddlužení nebude povoleno pro nesplnění podmínky minimální splátky.</p>` // připíšeme to do textu

            return text // a rovnou skončíme - nic dalšího už není potřeba vypisovat
        }

        // má-li dlužník dlužné výživné, text popisu to zmíní
        if (v.dluzneVyzivne){
            text += `<p>Dále se bude uspokojovat přednostně dlužné výživné, a to až do úplného splacení dlužné částky ${v.dluzneVyzivne} Kč.</p>`
        }

        if (v.mesicniVyzivne){
            text += `<p>Dále je třeba odečíst pravidelné měsíční výživné určené soudem ve výši ${v.mesicniVyzivne} Kč.</p>`
        }

        text += `<p>Teprve poté je možné uspokojovat nezajištěné věřitele.</p>`

        // text máme hotový, můžeme vrátit
        return text
    }
}