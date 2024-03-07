class ManagerNalezitostiOddluzeni{

    // třída slouží pro manipulaci s formulářem
    // formulář sám si jen pamatuje, které kolonky jsou jeho, co se v nich může vyplňovat, a umí posoudit, co v nich je
    // vůbec se však nestará o to, proč by to někdo chtěl vědět, a sám nic nedělá.
    // Pokyny k vyhodnocení mu zadává tento manžer, stejně tak jako vyvození důsledků takového vyhodnocení

    constructor(formularNalezitostiOddluzeni, formularPrijmu, formularVyzivovanychOsob){

        this.n = formularNalezitostiOddluzeni
        this.p = formularPrijmu
        this.v = formularVyzivovanychOsob

        this.divVyhodnoceniFormulareNalezitostiOddluzeni = document.getElementById("div-vyhodnoceni-formulare-nalezitosti-oddluzeni")

     

        this._pridatUdalosti()
    }

   
    

    _pridatUdalosti(){
        // nastaví potřebné události některým kolonkám formulářů
        // 1) každá kolonka formuláře náležitostí návrhu na povolení oddlužení ihned vyvolá přepis textového vyhodnocení
        // 2) každá změna hodnot daru nebo výživného ve formulářích příjmů a vyživovaných osobo může vyvolat zakázanost nebo naopak poivnnost odpovídajících kolonek ve formuláři náležitostí
        // ad bod 2) -> toto chování by bylo nejlepší implementovat jako "observer pattern" ale v dosavadní fázi jde o velmi jednoduchou závislost dvou kolonek,
        // takže se to jeví trochu jako overkill - pokud však přibudou i další závislsosti, vytvořit observera!

        
        // ke každé kolonce formuláře se přidá další change event listener.
        // právě ten přepíše text vyhodnocení formuláře při jakékoliv změně
        for (const polozka of this.n.vsechnyPolozky.polozky){
            polozka.kolonka.addEventListener('change', () => this.vypisVyhodnoceniFormulareNalezitostiOddluzeni())
        }


        // vytvoření předpřipravených funkcí pro prověření potřebnosti deaktivace kolonek daru a výživného
        const potrebaDisableDaru = () => {this.proverPotrebuDisabled(this.n.polozkaDarovaciSmlouva, (!this.p.vyseDaru && !this.p.typDaru))}
        const potrebaDisableVyzivne = () => {this.proverPotrebuDisabled(this.n.polozkaRozsudekOVyzivnem, (!this.v.mesicniVyzivne && !this.v.dluzneVyzivne))}
        
            // při startu aplikace si je rovnou 1x zavoláme
        potrebaDisableDaru()
        potrebaDisableVyzivne()

        // a později je budeme volat tehdy, když se změní kterákoliv z relevantních kolonek
        this._nastavReakci([this.p.polozkaVyseDaru.kolonka, this.p.polozkaTypDaru.kolonka], potrebaDisableDaru)
        this._nastavReakci([this.v.polozkaMesicniVyzivne.kolonka, this.v.polozkaDluzneVyzivne.kolonka], potrebaDisableVyzivne)
            // ^toto chování by bylo nejlepší implementovat jako "observer pattern" ale v dosavadní fázi jde o velmi jednoduchou závislost dvou kolonek,
            // takže se to jeví trochu jako overkill - pokud však přibudou i další závislsosti, vytvořit observera!
    }


    _nastavReakci(zpusobileOvlivnit, callback){
        // nastaví množině kolonek change event listener, který spustí zadaný callback
        for (const ovlivnitel of zpusobileOvlivnit){
            ovlivnitel.addEventListener('change',() => callback())
        }
    }
    

    proverPotrebuDisabled(polozka, podminka){
        // metoda podle boolean vyhodnoceni podminky buďto řekne formuláří náležitostí, ať si zadanou kolonku deaktivuje
        // anebo naopak aktivuje

        if (podminka){
            this.n.disableKolonka(polozka,true)
        } else{
            this.n.disableKolonka(polozka,false)                    // deaktivace disabled = kolonka je nyní povinná
            this.vypisVyhodnoceniFormulareNalezitostiOddluzeni()    // což musíme ihned zohlednit ve výpisu vyhodncoení náelžitostí oddlužení
        }
    }
  

    vypisVyhodnoceniFormulareNalezitostiOddluzeni(){
        // do cílového divu vypíše text odpovídající vyhodnocení kolonek formuláře
        
        const cil = this.divVyhodnoceniFormulareNalezitostiOddluzeni 
        
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

    vyhodnotKolonky(){
        // Vyhodnocení formuláře dle pevně daných pravidel (tato pravidla vyplývají přímo z insolvenčního zákona, jsou proto velmi hardcodová)
        // VELMI!!! zde záleží na pořadí, tedy aby již přímo ve třídě formuláře náležitostí byly položky seskupovány v přesně daném pořadí
        // o to se stará ale sám formulář

        const n = this.n     // pro lepší čitelnost uložíme referenci na formulář do jednopísmenné proměnné
        const vyhodnoceni = TextyNalezitostiOddluzeni.vyhodnoceni   // odkaz na textová data
        
        // napřed budeme posuzovat obecné náležitosti, se kterými se pracuje trochu jinak
        // u obecný náležitostí hraje každá sama za sebe - každá má svůj vlastní následek, proto stačí jednoduchá iterace

        for (const polozka of n.obecneNalezitosti.polozky){     // napříč každou položkou obecných náležitostí

            let vysledek
            vysledek = vyhodnoceni[polozka.obecnyNazev][polozka.kolonka.value]

            if (vysledek){
                return vysledek
            }

        }

        // dotazování skrze přílohy insolvnenčího návrhu a přílohy návrhu na povolení oddlužneí je složitější, protože posuzujeme spíše skupinu jako takovou
        let polozka
        const skupinyPriloh = [n.prilohyInsolvencnihoNavrhu,n.prilohyNavrhuNaPovoleniOddluzeni]

        for (const skupina of skupinyPriloh) {
            for (const callback of [polozky => n.jeVadneNecoZ(polozky), polozky => n.jeNevyplneneNecoZ(polozky)]){
                const polozky = skupina.polozky
                polozka = callback(polozky)
                if (polozka){
                    return vyhodnoceni[skupina.nazevSkupiny][polozka.kolonka.value]
                }
            } 
        }

        polozka = n.jeDiskutabilniNecoZ(n.vsechnyPolozky.polozky)

        if (polozka){
            return vyhodnoceni[polozka.kolonka.value]
        }

        return vyhodnoceni[n.obecneNalezitosti.polozky[0].kolonka.value]

    }

}