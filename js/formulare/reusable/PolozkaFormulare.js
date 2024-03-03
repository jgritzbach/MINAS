class PolozkaFormulare{
    // třída reprezentuje položku nějakého formuláře
    // sestává na prvním místě z nějaké kolonky, kam se něco vyplňuje, typicky z nějakého elementu <select> nebo <input>
    // současně však také může mít přidružený label
    // a také může mít přidruženou nápovědu, kterou lze zobrazit nějakou událostí.

    // Důležité je, že jedna položka má jednu kolonku. Ne více. Je-li více kolonek, musí být více položek
    // Pokud více kolonek potřebuje nějaké logické seskupení, má se to odehrát hierarchicky výše
    // například jejich setříděním v nějaké třídě "sekce formuláře"
    // Některé formuláře z důvodu lepší čitelnosti zobrazují položky vedle sebe místo pod sebou
    // tím se nenechme mást. I když jsou vedle sebe, a možná mají tedy něco společného, přesto jsou to samostatné položky a jejich seskupení se má odehrát jinde, například právě v nějaké "sekci formuláře"

    constructor(obecnyNazev){

        // obecnyNazev - to bude představovat část názvu společnou jako pro položku, tak pro kolonku a label
        // rozdíl pak bude v tom, že položka a kolonka budou mít každá jiné slovo před touto společnou frází
        // například pokud obecnyNazev bude "nalezitosti-plne-moci" 
        // tak proměnná kolonky už hned ví, že má hledat kolonka-nalezitosti-plne-moci

        const idPolozky = 'polozka-' + obecnyNazev
        const idKolonky = 'kolonka-' + obecnyNazev

        this.obecnyNazev = obecnyNazev                                          // toto je základní stavební kámen ID celé položky - z něj se odvozuje název kolonky, labelu, textů nápověd apod.
        this.polozka = document.getElementById(idPolozky)
        this.kolonka = document.getElementById(idKolonky)
        this.popisek = document.querySelector(`label[for="${idKolonky}"]`)      // příslušný label pro kolonku, pokud existuje

    }

    get obecnyNazev(){
        return this._obecnyNazev
    }

    set obecnyNazev(nazev){
        this._obecnyNazev = nazev
    }

    get polozka(){
        return this._polozka
    }

    set polozka(div){
        this._polozka = div
    }

    get kolonka(){
        return this._kolonka
    }

    set kolonka(kolonkaElement){
        this._kolonka = kolonkaElement
    }

    get popisek(){
        return this._popisek
    }
    
    set popisek(elementLabel){
        this._popisek = elementLabel
    }

    get kontejnerNapovedy(){
        return this._kontejnerNapovedy
    }

    set kontejnerNapovedy(div){
        this._kontejnerNapovedy = div
    }


    nastavNapovedu(zobrazovatel, htmlNapovedy){
        // tato metoda umožní položce formuláře obsahovat nápovědu
        // nápověda je samostatná třída
        // je potřeba nastavit jí vnitřní text, který má zobrazovat (respektive vnitřní html, například již rozčleněné do <p>)
        // dále je třeba nastavit odkaz na objekt, který bude zodpovědný za zobrazení nápovědy

        const napoveda = new Napoveda(htmlNapovedy)         // založíme nápovědu jako samostatný objekt - stačí jí oznámit text, který má obsahovat (respektive html, protože text už bude asi obsahovat <p>)
        napoveda.nastavZobrazovatele(zobrazovatel)          // nastavíme, kdo bude způsobovat zobrazení nápovědy

        const kontejner = napoveda.div                      // nápověda vygeneruje ucelený div, který stačí převzít

        kontejner.classList.add('kontejner-napovedy')       // doplníme ho o CSS třídy (nechceme, aby to dělala nápověda sama, třeba budu chtít časem jinak vypadající nápovědy)
        kontejner.classList.add('oblast-vypisu')
        kontejner.classList.add('vypis-ve-formulari')

        this.polozka.appendChild(kontejner)                 // <div> s nápovědou se vloží jako poslední element do položky
     
    }



}