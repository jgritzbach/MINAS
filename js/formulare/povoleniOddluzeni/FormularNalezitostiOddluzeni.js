class FormularOddluzeni extends BaseFormular{
    // úkolem této třídy je uchopit elementy z html stránky, které slouží pro vyplňování náležitostí návrhu na povolení oddlužení
    // to zahrnuje jednotlivé položky a jejich kolonky
    // jednotlivé kolonky i jejich logické soubory umí vyhodnotit
    // sama o sobě se však tato třída nestará o logiku aplikace, ani nic nikam nevypisuje, k tomu slouží její manager

    constructor(){

        super()     // formulář dědí od obecného formuláře

        this._uchopPolozky()                     // uchopíme všechny položky - obecné <divy>, ve kterých je samotná kolonka, label i kontejner pro nápovědu
        this._nastavPovoleneVolby()              // v rámci zaškrtávacích <selectů> jsou povolené volby 'prázdné', 'v pořádku', 'diskutabilní' a 'vadné'
        this._nastavKolonky()                    // v rámci položek nastavíme kolonkám povolené volby a reakce na ně

        super._nastavNapovedy(this.vsechnyPolozky.polozky, TextyNalezitostiOddluzeni)    // s pomocí bázové třídy vytvoří nápovědu všem kolonkám, kde jsou texty k dispozici
    }

    vymazVolbu(polozka){
        // v rámci zadané položky vymaže její kolonce volbu (tím, že jí nastaví na nevybráno)
        // také jí patřičně upraví atribut zaskrtnuti, na který reaguje CSS
        
        const kolonka = polozka.kolonka
        kolonka.selectedIndex = 0               // hodnota nevybráno je vždy první
        this._upravAtributZaskrtnuti(kolonka)   // na astribut 'zaskrtnuti' reaguje CSS -> mění barvy
    }

    disableKolonka(polozka, disabled){
        // v rámci zadané položky nastaví její kolonce hodnotu disabled na zadanou boolean hodnotu
        // pokud to znamená disabled=true, tak ji zrovna i dříve zvolenou hodnotu nastaví na nevybráno

        const kolonka = polozka.kolonka
        kolonka.disabled=disabled
        if (disabled){
            this.vymazVolbu(polozka)
        }
    }

    jeNevyplnene(polozka){
        // je-li kolonka zadané položky 'nevyplněná', vrátí položku, jinak vrací undefined
        // díky truthy/falsy vyhodnocení undefined nebo položky lze používat i jako boolean
        const kolonka = polozka.kolonka
        
        if ((!kolonka.disabled && kolonka.value === this.optionPrazdne.VALUE)){     // kolonka se považuje za nevyplněnou pouze pokud není deaktivovaná
            return polozka
        }
    }

    jeDiskutabilni(polozka){
        // je-li kolonka zadané položky 'diskutabilní', vrátí položku, jinak vrací undefined
        // díky truthy/falsy vyhodnocení undefined nebo položky lze používat i jako boolean
        const kolonka = polozka.kolonka
        
        if(kolonka.value === this.optionDiskutabilni.VALUE){
            return polozka
        }
    }

    jeVadne(polozka){
        // je-li kolonka zadané položky 'vadná', vrátí položku, jinak vrací undefined
        // díky truthy/falsy vyhodnocení undefined nebo položky lze používat i jako boolean
        const kolonka = polozka.kolonka
        
        if(kolonka.value === this.optionVadne.VALUE){
            return polozka
        }
    }

    jeNevyplneneNecoZ(polozky){
        // vrací první položku, jejíž kolonka je 'nevyplněná', jinak vrací undefined
        // díky truthy/falsy vyhodnocení undefined nebo položky lze používat i jako boolean
        return this._jeNecoZPredanychNejake(polozky, polozka => this.jeNevyplnene(polozka))  // callback musíme předat arrow funkcí, jinak ztratíme kontext this, který má odkazovat na instanci formuláře     
    }

    jeDiskutabilniNecoZ(polozky){
        // vrací první položku, jejíž kolonka je 'diskutabilní', jinak vrací undefined
        // díky truthy/falsy vyhodnocení undefined nebo položky lze používat i jako boolean
        return this._jeNecoZPredanychNejake(polozky, polozka => this.jeDiskutabilni(polozka))
    }

    jeVadneNecoZ(polozky){
        // vrací první položku, jejíž kolonka je 'vadná', jinak vrací undefined
        // díky truthy/falsy vyhodnocení undefined nebo položky lze používat i jako boolean
        return this._jeNecoZPredanychNejake(polozky, polozka => this.jeVadne(polozka))
    }

    _jeNecoZPredanychNejake(polozky, callback){
        // vrací první položku, jejíž kolonka má pravdivý výsledek na ni aplikovaného zadaného callbacku, jinak vrací undefined
        // díky truthy/falsy vyhodnocení undefined nebo položky lze používat i jako boolean
        for (const polozka of polozky){
            
            if (callback(polozka)){            // stačí jediný pravdivý callback a hned vracíme položku (iterace končí)
                return polozka
            }
        }
    }

    _uchopPolozky(){
        // na stránce uchopí dle jejich id patřičné položky -> <divy>, které někde uvnitř sebe mají kolonku (elementy <select>), label a kontejner pro nápovědu
    
            // Obecné náležitosti
            this.polozkaPlneMoci = new PolozkaFormulare("nalezitosti-plne-moci")
            this.polozkaFormaPodani = new PolozkaFormulare("nalezitosti-formy-podani")
            this.polozkaTvrzeniOUpadku = new PolozkaFormulare("tvrzeni-o-upadku")
            this.polozkaMistniPrislusnost = new PolozkaFormulare("mistni-prislusnost")
    
            // Přílohy insolvenčního návrhu
            this.polozkaSeznamMajetku = new PolozkaFormulare("seznam-majetku")
            this.polozkaSeznamZamestnancu = new PolozkaFormulare("seznam-zamestnancu")
            this.polozkaListinyDokladajiciUpadek = new PolozkaFormulare("listiny-dokladajici-upadek")
    
            // Přílohy návrhu na povolení oddlužení
            this.polozkaProhlaseniOPouceni = new PolozkaFormulare("prohlaseni-o-pouceni")
            this.polozkaSoucasnePrijmy = new PolozkaFormulare("priloha-soucasne-prijmy")
            this.polozkaMinulePrijmy = new PolozkaFormulare("prijmy-za-12-mesicu")
            // this.polozkaProhlaseniManzeluOMajetku = new PolozkaFormulare("prohlaseni-manzelu-o-majetku")      Dočasně vypnuto, dokud nebude zapracována i varianta pro manžela
    
            // Další přílohy
            this.polozkaDarovaciSmlouva = new PolozkaFormulare("priloha-darovaci-smlouva")
            this.polozkaRozsudekOVyzivnem = new PolozkaFormulare("priloha-rozsudek-o-vyzivnem")
    
        // Logické Seskupení některých položek
            
            // všechny
            this.vsechnyPolozky = new SkupinaPolozekFormulare('vsechny-polozky',[
                this.polozkaPlneMoci,
                this.polozkaFormaPodani,
                this.polozkaTvrzeniOUpadku,
                this.polozkaMistniPrislusnost,

                this.polozkaSeznamMajetku,
                this.polozkaSeznamZamestnancu,
                this.polozkaListinyDokladajiciUpadek,

                this.polozkaProhlaseniOPouceni,
                this.polozkaSoucasnePrijmy,
                this.polozkaMinulePrijmy,
                // this.polozkaProhlaseniManzeluOMajetku, Dočasně vypnuto, dokud nebude zapracována i varianta pro manžela
        
                this.polozkaDarovaciSmlouva,
                this.polozkaRozsudekOVyzivnem,
            ])
            
    
            // obecné náležitosti
            this.obecneNalezitosti = new SkupinaPolozekFormulare('obecne-nalezitosti',[
                this.polozkaPlneMoci,
                this.polozkaFormaPodani,
                this.polozkaTvrzeniOUpadku,
                this.polozkaMistniPrislusnost,
            ])
    
            //přílohy insolvenčního návrhu
            this.prilohyInsolvencnihoNavrhu = new SkupinaPolozekFormulare('prilohy-insolvencniho-navrhu',[
                this.polozkaSeznamMajetku,
                this.polozkaSeznamZamestnancu,
                this.polozkaListinyDokladajiciUpadek,
            ])
    
            // přílohy návrhu na povolení oddlužení
            this.prilohyNavrhuNaPovoleniOddluzeni = new SkupinaPolozekFormulare('prilohy-navrhu-na-povoleni-oddluzeni',[
                this.polozkaProhlaseniOPouceni,
                this.polozkaSoucasnePrijmy,
                this.polozkaMinulePrijmy,
                // this.polozkaProhlaseniManzeluOMajetku,                      Dočasně vypnuto, dokud nebude zapracována i varianta pro manžela
                this.polozkaDarovaciSmlouva,
                this.polozkaRozsudekOVyzivnem,
            ])
    
        }
    
    _nastavKolonky(){
        // všem kolonkám (což jsou <select> elementy) nastaví jako přípustnou volbu zaškrtávací možnosti 'nevyplneno / v pořádku / diskutabilní / vadné'
        // také jim nastaví reakci na změnu

        for (const polozka of this.vsechnyPolozky.polozky){
            const kolonka = polozka.kolonka
            this._nastavZaskrtavaciVolby(kolonka)   // každý <select> bude mít stejné <options>
            this._nastavReakciNaVolbu(kolonka)      // každý <select> má reagovat na změnu <option>
        }

    }

    _nastavZaskrtavaciVolby(selectElement){
        // nastaví zadanému <select> jeho přípustné zaškrtávací <options> 'nevyplneno / v pořádku / diskutabilní / vadné'

        for (const zaskrtavaciVolba of this.povoleneVolby){            // iterujeme skrze vlastnosti čtyř přípustných zakštávacích hodnot (ty jsou napevno definovány v instanční proměnné)

            const option = document.createElement('option')             // vytvoříme nový element <option> (v každé iteraci vytváříme jinou přípustnou hodnotu)
            option.value = zaskrtavaciVolba.VALUE                       // a přiřadíme jí předdefinovaný value
            option.innerText = zaskrtavaciVolba.TEXT                    // a innerText

            selectElement.appendChild(option)                           // hotový <option> vložíme do předaného <select>
        }

    }
    
    _nastavReakciNaVolbu(selectElement){
        // nastaví vybranému <select> reakci na zvolení některé z <option>
        // reakcí je, že v rámci <select>.ClassList se přepíše atribut 'zaskrtnuti', na který reaguje CSS změnou barvy
        
        selectElement.addEventListener('change', () =>{

            this._upravAtributZaskrtnuti(selectElement)      // atribut zaskrtnuti je vlastní atribut sloužící pro reprezentaci zakšrtnuté volby pro snazší CSS
        })

    }

    _upravAtributZaskrtnuti(selectElement){
        // nastavi <selectu> vlastní atribut zaskrtnuti tak, aby se jeho hodnota rovnala selected <option>.value

        const novaVolba = selectElement.options[selectElement.selectedIndex].value  // uchopíme zvolený <option>.value
        selectElement.setAttribute('zaskrtnuti', novaVolba)    // právě <option>.value se stane i hodnotou 'zaskrtnuti' - na tu zareaguje CSS přebarvením
    }

    _nastavPovoleneVolby(){
        // nastaví si vnitřní konstantní hodnoty pro <option> elementy - jejich innerTexty a values
        // právě ty jsou později používány pro nastavení přípustných <option> a porovnávání hodnot <selectu>
        
        this.optionPrazdne = {
            VALUE: 'nevyplneno',
            TEXT: "",
        }

        this.optionVPoradku = {
            VALUE: 'v-poradku',
            TEXT: "\u2714 v pořádku",
        }

        this.optionDiskutabilni = {
            VALUE: 'diskutabilni',
            TEXT: "? diskutabilní",
        }

        this.optionVadne = {
            VALUE: 'vadne',
            TEXT: "\u2717 vadné",
        }

        // ačkoliv hodnoty jednotlivých voleb jsou přímo dostupné, pro snazší hromadné iterace uchováváme odkazy na ně také 
        this.povoleneVolby = [this.optionPrazdne, this.optionVPoradku, this.optionDiskutabilni, this.optionVadne,] // hromadně v poli

    }

}