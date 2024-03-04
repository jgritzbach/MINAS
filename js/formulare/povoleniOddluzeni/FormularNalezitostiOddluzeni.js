class FormularOddluzeni extends BaseFormular{

    // Úkolem této třídy je uchopit elementy z html stránky, které slouží jako formulář náležitostí návrhu na oddlužení
    // Tyto náležitosti má umět vyhodnotit a vrátit výsledný stav
    // Sama o sobě tato třída nic nikam nevypisuje, k tomu může sloužit nějaký její manager

    constructor(){

        super()

        this._uchopPolozky()                     // uchopíme všechny položky - obecné divy, kde je kolonka, label i kontejner pro nápovědu

        this._nastavPovoleneVolby()              // v rámci zaškrtávacích <selectů> jsou povolené volby 'prázdné', 'v pořádku', 'diskutabilní' a 'vadné'
        this._nastavKolonky()                    // v rámci položek nastavíme kolonkám povolené volby a reakce na ně

        super._nastavNapovedy(this.vsechnyPolozky, TextyNapovedNalezitostiOddluzeni)    // s pomocí bázové třídy vytvoří nápovědu všem kolonkám, kde jsou texty k dispozici
    }

   
    _uchopPolozky(){
        
    // na stránce uchopí dle jejich id patřičné položky -> divy, které někde uvnitř sebe mají kolonku (elementy <select>), label a kontejner pro nápovědu

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
        this.vsechnyPolozky = [
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
        ]

            //přílohy insolvenčního návrhu
        this.prilohyInsolvencnihoNavrhu = [
            this.polozkaSeznamMajetku,
            this.polozkaSeznamZamestnancu,
            this.polozkaListinyDokladajiciUpadek,
        ]

            // přílohy návrhu na povolení oddlužení
        this.prilohyNavrhuNaPovoleniOddluzeni = [
            this.polozkaProhlaseniOPouceni,
            this.polozkaSoucasnePrijmy,
            this.polozkaMinulePrijmy,
            // this.polozkaProhlaseniManzeluOMajetku,                      Dočasně vypnuto, dokud nebude zapracována i varianta pro manžela
            this.polozkaDarovaciSmlouva,
            this.polozkaRozsudekOVyzivnem,
        ]

    }

    _nastavKolonky(){
        // všem <select> kolonkám nastaví jako přípustnou volbu zaškrtávací možnosti v pořádku / diskutabilní / vadné
        // a nastaví jim také reakci na změnu

        for (const polozka of this.vsechnyPolozky){
            const kolonka = polozka.kolonka
            this._nastavZaskrtavaciVolby(kolonka)
            this._nastavReakciNaVolbu(kolonka)
        }

    }

    _nastavZaskrtavaciVolby(selectElement){

        // nastaví zadanému <select> jeho přípustné zaškrtávací <options>

        for (const zaskrtavaciVolba of this.povoleneVolby){            // iterujeme skrze vlastnosti čtyř přípustných zakštávacích hodnot (ty jsou napevno definovány v instanční proměnné)

            const option = document.createElement('option')             // vytvoříme nový element <option> (v každé iteraci vytváříme jinou přípustnou hodnotu)
            option.value = zaskrtavaciVolba.VALUE                       // a přiřadíme jí předdefinovaný value
            option.innerText = zaskrtavaciVolba.TEXT                    // a innerText

            selectElement.appendChild(option)                           // hotový <option> vložíme do předaného <select>

        }

    }
    
    _nastavReakciNaVolbu(selectElement){
        
        // Nastaví vybranému <select> reakci na zvolení některé z option
        // reakcí je přepis té části <select>.ClassList, která se týká barvy (o faktické přebarvení se stará CSS)
        
        selectElement.addEventListener('change', () =>{

            this._upravAtributZaskrtnuti(selectElement)      // atribut zaskrtnuti je vlastní atribut sloužící pro reprezentaci zakšrtnuté volby pro snazší CSS

        })

    }

    _upravAtributZaskrtnuti(selectElement){
        // nastavi <selectu> vlastní atribut zaskrtnuti tak, aby s ejeho hodnota rovnala selected <option>.value

        const novaVolba = selectElement.options[selectElement.selectedIndex].value  // namísto toho uchopíme zvolený <option>.value
        selectElement.setAttribute('zaskrtnuti', novaVolba)
    }

    vymazVolbu(polozka){
        // v rámci zadané položky vymaže její položce volbu (tím, že jí nastaví na nevybráno)
        // také jí patřičně upraví atribut zaskrtnuti, na který reaguje CSS
        
        const kolonka = polozka.kolonka
        kolonka.selectedIndex = 0
        this._upravAtributZaskrtnuti(kolonka)
    }

    disableKolonka(polozka, disabled){
        // v rámci zadané položky nastaví její kolonce hodnotu disabled na zadanou boolean hodnotu
        // pokud to znamená disabled=true, tak ji zrovna i dříve zvolenou hodnotu a atribut zaskrtnuti (pro potřeby CSS) nastaví na nevybráno

        const kolonka = polozka.kolonka
        kolonka.disabled=disabled
        if (disabled){
            this.vymazVolbu(polozka)
        }
    }

    _nastavPovoleneVolby(){

        // nastaví si vnitřní konstantní hodnoty pro <option> elementy - jejich innerTexty a values
        // právě ty jsou později používány pro nastavení přípustných <option> a porovnávání hodnot <selectu>
        
        this.optionPrazdne = {
            VALUE: 'nevybrano',
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

    // Pomocné vyhodnocovací metody - 
    // formulář umí odpovídat na dotazy stran vyplněných hodnot svých kolonek.
    // odpovídá však jen true/false a vůbec se nestará o to, proč to chce někdo vědět a co s tím udělá (o vyhodnocení se postará manažer)

    _jeNevyplnene(polozka){
        // Vrací údaj o tom, zda kolonka dané položky je nevyplněná
        const kolonka = polozka.kolonka
        return (!kolonka.disabled && kolonka.value === this.optionPrazdne.VALUE)     // kolonka se považuje za nevyplněnou pouze pokud není deaktivovaná
    }

    _jeDiskutabilni(polozka){
        // Vrací údaj o tom, zda kolonka dané položky má vyplněnou volbu 'diskutabilní'
        const kolonka = polozka.kolonka
        return kolonka.value === this.optionDiskutabilni.VALUE
    }

    _jeVadne(polozka){
        // Vrací údaj o tom, zda kolonka dané položky má vyplněnou volbu 'diskutabilní'
        const kolonka = polozka.kolonka
        return kolonka.value === this.optionVadne.VALUE
    }

    _jeNecoZPredanychNejake(polozky, callback){
        // Vrací údaj o tom, zda alespoň některá z kolonek předaných položek má pravdivý výsledek callbacku
        for (const polozka of polozky){
            
            if (callback(polozka)){            // stačí jediný pravdivý callback a hned vracíme pravdu (iterace končí)
                return true
            }
        }
    }

    _jeNevyplneneNecoZ(polozky){
        // Vrací údaj o tom, zda alespoň některá z kolonek předaných položek je nevyplněná

        return this._jeNecoZPredanychNejake(polozky, polozka => this._jeNevyplnene(polozka))  // callback musíme předat arrow funkcí, jinak ztratíme kontext this, který má odkazovat na instanci formuláře     
    }

    _jeDiskutabilniNecoZ(polozky){
        // Vrací údaj o tom, zda alespoň některá z kolonek předaných položek je diskutabilní
        return this._jeNecoZPredanychNejake(polozky, polozka => this._jeDiskutabilni(polozka))
    }

    _jeVadneNecoZ(polozky){
        // Vrací údaj o tom, zda alespoň některá z kolonek předaných položek je vadná
        return this._jeNecoZPredanychNejake(polozky, polozka => this._jeVadne(polozka))
    }

}