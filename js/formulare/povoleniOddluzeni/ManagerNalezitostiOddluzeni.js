class ManagerNalezitostiOddluzeni{
    // třída slouží pro manipulaci s formulářem náležitostí návrhu na povolení oddlužení
    // formulář sám si jen pamatuje, které kolonky jsou jeho, co se v nich může vyplňovat, a umí posoudit, co v nich je
    // vůbec se však nestará o to, proč by to někdo chtěl vědět, a sám nic nedělá.
    // právě tento manažer z hodnot formuláře vyvozuje důsledky a nutí ho vypínat některé své kolonky
    // za tímto účelem přeneseně komunikuje stav i formuláře příjmů a vyživovaných osob

    constructor(formularNalezitostiOddluzeni, formularPrijmu, formularVyzivovanychOsob){

        this.n = formularNalezitostiOddluzeni
        this.p = formularPrijmu
        this.v = formularVyzivovanychOsob

        this.divVyhodnoceniFormulareNalezitostiOddluzeni = document.getElementById("div-vyhodnoceni-formulare-nalezitosti-oddluzeni")

        this._pridatUdalosti()
    }

    vypisVyhodnoceniFormulareNalezitostiOddluzeni(){
        // do cílového divu vypíše text odpovídající vyhodnocení kolonek formuláře
        
        const cil = this.divVyhodnoceniFormulareNalezitostiOddluzeni 
        
        const stavajiciHTML = cil.innerHTML
        const noveHTML = this._vyhodnotKolonky()

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

    _pridatUdalosti(){
        // nastaví potřebné události některým kolonkám formulářů
        // 1) každá kolonka formuláře náležitostí návrhu na povolení oddlužení ihned vyvolá přepis textového vyhodnocení
        // 2) každá změna hodnot daru nebo výživného ve formulářích příjmů a vyživovaných osobo může vyvolat zakázanost nebo naopak poivnnost odpovídajících kolonek ve formuláři náležitostí
        // ad bod 2) -> toto chování by bylo nejlepší implementovat jako "observer pattern" ale v dosavadní fázi jde o velmi jednoduchou závislost dvou kolonek,
        // takže se to jeví trochu jako overkill - pokud však přibudou i další závislosti, vytvořit observera!

        // ke každé kolonce formuláře náležitostí návrhu na oddlužení se přidá další change event listener.
        // právě ten přepíše text vyhodnocení formuláře při jakékoliv změně
        for (const polozka of this.n.vsechnyPolozky.polozky){
            polozka.kolonka.addEventListener('change', () => this.vypisVyhodnoceniFormulareNalezitostiOddluzeni())
        }

        // vytvoření předpřipravených funkcí pro prověření potřebnosti deaktivace kolonek daru a výživného
        const potrebaDisableDaru = () => {this._proverPotrebuDisabled(this.n.polozkaDarovaciSmlouva, (!this.p.vyseDaru && !this.p.typDaru))}
        const potrebaDisableVyzivne = () => {this._proverPotrebuDisabled(this.n.polozkaRozsudekOVyzivnem, (!this.v.mesicniVyzivne && !this.v.dluzneVyzivne))}
        
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
    
    _proverPotrebuDisabled(polozka, podminka){
        // metoda podle boolean vyhodnoceni podminky buďto řekne formuláří náležitostí, ať si zadanou kolonku deaktivuje
        // anebo naopak aktivuje

        if (podminka){
            this.n.disableKolonka(polozka,true)
        } else{
            this.n.disableKolonka(polozka,false)                    // deaktivace disabled = kolonka je nyní povinná
            this.vypisVyhodnoceniFormulareNalezitostiOddluzeni()    // což musíme ihned zohlednit ve výpisu vyhodncoení náelžitostí oddlužení
        }
    }
  
    _vyhodnotKolonky(){
        // Vyhodnocení formuláře dle pevně daných pravidel (tato pravidla vyplývají přímo z insolvenčního zákona, jsou proto velmi hardcodová)
        // VELMI!!! zde záleží na pořadí, tedy aby již přímo ve třídě formuláře náležitostí byly položky seskupovány v přesně daném pořadí
        // o to se stará ale sám formulář

        const n = this.n     // pro lepší čitelnost uložíme referenci na formulář do jednopísmenné proměnné
        const vyhodnoceni = TextyNalezitostiOddluzeni.vyhodnoceni   // odkaz na textová data
        
        // napřed budeme posuzovat obecné náležitosti, se kterými se pracuje trochu jinak
        // u obecný náležitostí hraje každá sama za sebe - každá má svůj vlastní následek, proto stačí jednoduchá iterace

        for (const polozka of n.obecneNalezitosti.polozky){     // napříč každou položkou obecných náležitostí

            let vysledek = vyhodnoceni[polozka.obecnyNazev][polozka.kolonka.value]  // vyzkoušíme, zda ve "slovníku" textů pod kombinací iterované položky a value nenajdeme nějaký záznam

            if (vysledek){      // pokud se nějaký záznam našel, 
                return vysledek     // chceme ho rovnou vypsat a dál ani nepokračujeme.
            }                   // jestliže však pro danou kombinací položky a value její kolonky žádný záznam není, jdeme dále 

        }

        // dotazování skrze přílohy insolvnenčího návrhu a přílohy návrhu na povolení oddlužneí je složitější, protože posuzujeme spíše skupinu jako takovou
        let polozka

        // postupně v pevně daném pořadí chceme vyhodnocovat napřed přílohy IN a až poté přílohy ODDL.
        const skupinyPriloh = [n.prilohyInsolvencnihoNavrhu,n.prilohyNavrhuNaPovoleniOddluzeni]

        for (const skupina of skupinyPriloh) {      // napříč skupinami, tedy napřed skrze položky IN a poté až skrze položky ODDL.
            for (const callback of [polozky => n.jeVadneNecoZ(polozky), polozky => n.jeNevyplneneNecoZ(polozky)]){  // vyzkoušíme po sobě dva callbacky, napřed jeVadne() a poté jeNevyplneno()
                polozka = callback(skupina.polozky)     // vyzkoušíme, zda se nám z dotazovacího callbacku vrátí nějaká položka (splnila podmínku callbacku)
                if (polozka){                   // pokud ano,
                    return vyhodnoceni[skupina.nazevSkupiny][polozka.kolonka.value]     //  chceme ihned vypsat text, který ve "slovníku" odpovídá kombinaci položky a value
                }
            } 
        }

        // Pokud jsme došli až sem, znamená to, že žádná z povinných kolonek nebyla ani vadná, ani nezůstala nevyplněná
        polozka = n.jeDiskutabilniNecoZ(n.vsechnyPolozky.polozky)   // stále by však mohlo být něco diskutabilní
        if (polozka){   // pokud má nějaká položka pozitivní test diskutabilnosti
            return vyhodnoceni[polozka.kolonka.value]       // tak si ve "slovníku" vytáhneme text přímo pro diskutabilnost jako takovou
        }

        // Pokud jsme došli až sem, znamená to, že všechny povinné kolonky jsou v pořádku
        return vyhodnoceni[n.obecneNalezitosti.polozky[0].kolonka.value]    // jelikož VŠECHNY mají value v-poradku, můžeme vzít klidně value hned té první jako klíčpro slovník

    }

}