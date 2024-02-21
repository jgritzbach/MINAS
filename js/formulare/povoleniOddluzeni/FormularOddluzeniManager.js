class FormularOddluzeniManager{

    // třída slouží pro manipulaci s formulářem
    // formulář sám si jen pamatuje, které kolonky jsou jeho, co se v nich může vyplňovat, a umí posoudit, co v nich je
    // vůbec se však nestará o to, proč by to někdo chtěl vědět, a sám nic nedělá.
    // Pokyny k vyhodnocení mu zadává tento manžer, stejně tak jako vyvození důsledků takového vyhodnocení

    constructor(){

        this.divVyhodnoceniFormulare = document.getElementById("div-vyhodnoceni-formulare")

        this.formular = new FormularOddluzeni()
        this._pridatUdalostVyhodnoceni()
    }


    vypisVyhodnoceniFormulare(){
        // do cílového divu vypíše text odpovídající vyhodnocení kolonek formuláře
        
        const cil = this.divVyhodnoceniFormulare 
        
        const stavajiciHTML = cil.innerHTML
        const noveHTML = this.vyhodnotKolonky()

        if (stavajiciHTML == noveHTML){
            return
        }
        
        
        cil.classList.add('pomalu-zmizet')

        setTimeout(() =>{
            cil.innerHTML = noveHTML
            cil.classList.replace('pomalu-zmizet', 'pomalu-se-objevit')
        },200)
        
        cil.classList.remove('pomalu-se-objevit')

    }
    

    _pridatUdalostVyhodnoceni(){
        // ke každé kolonce formuláře se přidá další change event listener.
        // právě ten přepíše text vyhodnocení formuláře při jakékoliv změně

        for (const kolonka of this.formular.vsechnyKolonky){
            kolonka.addEventListener('change', () => this.vypisVyhodnoceniFormulare())
        }

    }


    vyhodnotKolonky(){
        // vyhodnotí vnitřní kolonky formuláře a vrátí stav reprezentovaný číslem
        // Vyhodnocení formuláře dle pevně daných pravidel (tato pravidla vyplývají přímo z insolvenčního zákona, jsou proto velmi hardcodová)

        const f = this.formular     // pro lepší čitelnost uložíme referenci na formulář do jednopísmenné proměnné

        // Přednost má vada plné moci - nepřihlíží se a nelze napravit, ani se nemusíme dívat dál
        if (f._jeVadne(f.kolonkaPlneMoci)){
            return `<p>Vadná plná moc má za následek, že k insolvenčnímu návrhu se nepřihlíží (srov. § 97 IZ).</p>
                    <p>Žádnými dalšími náležitostmi se soud nebude vůbec zabývat. Nedojde k vydání vyhlášky o zahájení insolvenčního řízení (srov. § 101 IZ), ani k vyvolání účinků jinak spojených s jeho zahájením (srov. § 109 IZ).</p>
                    <p>Jedná se o neodstranitelnou vadu, soud vás nebude vyzývat k opravě. Proti rozhodnutí o nepřihlížení k insolvenčnímu návrhu není přípustné odvolání. Insolvenční řízení tímto rozhodnutím skončí.</p>`
        }

        if (f._jeNevyplnene(f.kolonkaPlneMoci)){
            return `<p>Není vyplněna kolonka náležitostí plné moci.</p>
                    <p>Plnou  moc je přitom třeba zkoumat přednostně před následnými kolonkami. Ukázala-li by se plná moc jako vadná, je vyhodnocování ostatních náležitostí předčasné a tudíž zbytečné.</p>`
        }


        // Poté je forma podání - zpracovatel má DS, takže má podat elektronicky, neučiní-li, výzva k opravě. Neopraví-li, odmítne se 
        if (f._jeVadne(f.kolonkaFormaPodani)){
            return `<p>Forma podání insolvenčního návrhu spojeného s návrhem na povolení oddlužení je vadná.</p>
                    <p>Zpracovatelem návrhu na povolení oddlužení je typicky advokát, insolvenční správce nebo akreditovaná osoba. Jedná se o osoby, které mají zřízenou datovou schránku ze zákona a vůči insolvenčnímu soudu tak mohou činit podání pouze v elektronické podobě (srov. § 80a IZ).</p>
                    <p>Jedná se o odstranitelnou vadu. Soud v případě podání v listinné podobě vyzve zpracovatele návrhu k podání tohoto návrhu v elektronické podobě. Nebude-li ve stanovené lhůtě forma podání opravena, k návrhu se nebude přihlížet (srov. § 97 odst. 4 IZ) a insolvenční řízení tím skončí.</p>`
        }

        if (f._jeNevyplnene(f.kolonkaFormaPodani)){
            return `<p>Není vyplněna kolonka náležitostí formy podání.</p>
                    <p>Formu podání je přitom třeba zkoumat přednostně před následnými kolonkami. Ukázala-li by se forma podání jako vadná, je vyhodnocování následných náležitostí předčasné a tudíž zbytečné.</p>`
        }

        // Vyhodnocení tvrzení o úpadku
        if (f._jeVadne(f.kolonkaTvrzeniOUpadku)){
            return `<p>Tvrzení o úpadku dlužníka je nedostatečné.</p>
                    <p>Insolvenční návrh bude soudem odmítnut (srov. § 128 odst. 1 IZ). Ač se to může jevit neobvyklé, má odmítnutí insolvenčního návrhu pro nedostatečné tvrzení o úpadku dlužníka přednost i před posouzením místní nepříslušnosti (srov. § 7b odst. 5 IZ).</p>
                    <p>Jedná se o neodstranitelnou vadu, soud vás nebude vyzývat k opravě. Odmítnutím insolvenčního návrhu insolvenční řízení skončí.</p>`
        }

        if (f._jeNevyplnene(f.kolonkaTvrzeniOUpadku)){
            return `<p>Není vyplněna kolonka náležitostí tvrzení o úpadku.</p>
                    <p>Tvrzení o úpadku je přitom třeba zkoumat přednostně před následnými kolonkami. Ukázala-li by se tvrzení o úpadku jako vadná, je vyhodnocování následných náležitostí předčasné a tudíž zbytečné.<p/>`
        }


        // Vyhodnocení místní příslušnosti
        if (f._jeVadne(f.kolonkaMistniPrislusnost)){
            return `<p>Místní příslušnost Krajského soudu patří mezi podmínky řízení, bez kterých není možné rozhodnout ve věci samé (srov. § 7b IZ).</p>
                    <p>Sezná-li soud, že je místně nepříslušný, postoupí věc místně příslušnému soudu.</p>
                    <p>Nedostatek místní příslušnosti nelze napravit. Řízení však nekončí, pouze se přesune k jinému soudu, který se bude věcí dále zabývat.</p>`
        }

        if (f._jeNevyplnene(f.kolonkaMistniPrislusnost)){
            return `<p>Není vyplněna kolonka místní příslušnosti.</p>
                    <p>Místní příslušnost je přitom třeba zkoumat přednostně před následnými kolonkami. Ukázalo-li by se, že soud není místně příslušný, je vyhodnocování následných náležitostí předčasné a tudíž zbytečné.</p>`
        }

        // vady příloh insolvenčního návrhu - lze to napravit na výzvu - nedoplní-li odmítne se, protože insolvnenčí návrh nelze projednat, a soud se návrhem na oddlužení nezabývá
        if (f._jeVadneNecoZ(f.prilohyInsolvencnihoNavrhu)){
            return `<p>Některá z povinných příloh insolvenčního návrhu je vadná nebo chybí.</p>
                    <p>Jedná se o odstranitelnou vadu. Soud v případě vadných příloh insolvenčního návrhu vyzve navrhovatele k jejich doplnění. Nebudou-li ve stanovené lhůtě přílohy doplněny, soud insolvenční návrh odmítne (srov. § 128 odst. 2 IZ) a insolvenční řízení tím skončí.</p>`
        }

        if (f._jeNevyplneneNecoZ(f.prilohyInsolvencnihoNavrhu)){
            return `<p>Nejsou vyplněny všechny kolonky příloh insolvenčního návrhu.<p/>
                    <p>Přílohy insolvenčního návrhu je přitom třeba zkoumat přednostně před následnými kolonkami. Pokud by vady příloh insolvenčního návrhu  nebyly odstraněny, insolvenční návrh by byl odmítnut, a vyhodnocování příloh návrhu na povolení oddlužení by bylo předčasné a tudíž zbytečné.</p>`
        }


        // vady příloh návrhu na oddlužení - lze to napravit na výzvu - nedoplní-li odmítne se návrh na povolení oddlužení, ale je-li IN v pořádku, lze IN projednat - rozhodne se o úpadku dlužníka buďto se řízení zastaví, nebo se prohlásí konkurs
        if (f._jeVadneNecoZ(f.prilohyNavrhuNaPovoleniOddluzeni)){
            return `<p>Některá z povinných návrhu na povolení oddlužení je vadná nebo chybí.</p>
                    <p>Jedná se o odstranitelnou vadu. Soud v případě vadných příloh návrhu na povolení oddlužení vyzve navrhovatele k jejich doplnění (srov. § 393 odst. 2 IZ).</p>
                    <p>Nebudou-li přílohy ve stanovené lhůtě doplněny soud návrh na povolení oddlužení odmítne (§ 393 odst. 3 IZ). Jsou-li však náležitosti insolvenčního návrhu a jeho příloh v pořádku, soud přesto rozhodne o úpadku dlužníka. Pouze není možné řešit úpadek oddlužením. Dle stavu majetkové podstaty soud buďto na majetek dlužníka prohlásí konkurs, anebo pro nedostatek majetku řízení zastaví.</p>`
        }

        // vady příloh návrhu na oddlužení - lze to napravit na výzvu - nedoplní-li odmítne se návrh na povolení oddlužení, ale je-li IN v pořádku, lze IN projednat - rozhodne se o úpadku dlužníka buďto se řízení zastaví, nebo se prohlásí konkurs
        if (f._jeNevyplneneNecoZ(f.prilohyNavrhuNaPovoleniOddluzeni)){
            return `<p>Nejsou vyplněny všechny kolonky příloh návrhu na povolení oddlužení. Bez vyplnění těchto kolonek je sice možné posoudit insolvenční návrh, ale již ne návrh na povolení oddlužení.</p>`
        }

        // je-li nkěterá kolonka diskutabilní, je postup nejistý
        if (f._jeDiskutabilniNecoZ(f.vsechnyKolonky)){
            return `<p>Všechny kolonky byly vyplněny, ale některé náležitosti jsou diskutabilní.</p>
                    <p>Insolvenční návrh spojený s návrhem na povolení oddlužení by mohl u soud obstát, ale konkrétní výsledek závisí na okolnostech případu.</p>`
        }

        // nenastala-li žádná z přednostních podmínek, je vše v pořádku
        return `<p>Všechny náležitosti insolvenčního návrhu spojeného s návrhem na povolení oddlužení se zdají být v pořádku.</p>
                <p>Soud by mohl rozhodnout o úpadku dlužníka a povolit jeho oddlužení.</p>`
    
    }

    
    
        

}