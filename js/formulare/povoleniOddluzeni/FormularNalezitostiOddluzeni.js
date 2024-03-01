class FormularOddluzeni{

    // Úkolem této třídy je uchopit elementy z html stránky, které slouží jako formulář náležitostí návrhu na oddlužení
    // Tyto náležitosti má umět vyhodnotit a vrátit výsledný stav
    // Sama o sobě tato třída nic nikam nevypisuje, k tomu může sloužit nějaký její manager

    constructor(){

        this._nastavPovoleneVolby()                         // povolené volby jsou 'prázdné', 'v pořádku', 'diskutabilní' a 'vadné'
        this._uchopKolonky()                                // uchopíme všechny elementy <select> k vyplnění
        this._nastavKolonky()                               // a nastavíme jim vše potřebné
    }


    _nastavKolonky(){
        // všem <select> kolonkám nastaví jako přípustnou volbu zaškrtávací možnosti v pořádku / diskutabilní / vadné
        // a nastaví jim také reakci na změnu

        for (const kolonka of this.vsechnyKolonky){
            this._nastavZaskrtavaciVolby(kolonka)
            this._nastavReakciNaVolbu(kolonka)
        }

    }

    _uchopKolonky(){
        
        // na stránce uchopí patřičné kolonky (elementy <select>) dle jejich id a uloží je do vnitřních proměnných formuláře

        // Obecné náležitosti
        this.kolonkaPlneMoci = document.getElementById("kolonka-nalezitosti-plne-moci")
        this.kolonkaFormaPodani = document.getElementById("kolonka-nalezitosti-formy-podani")
        this.kolonkaTvrzeniOUpadku = document.getElementById("kolonka-tvrzeni-o-upadku")
        this.kolonkaMistniPrislusnost = document.getElementById("kolonka-mistni-prislusnost")

        // Přílohy insolvenčního návrhu
        this.kolonkaSeznamMajetku = document.getElementById("kolonka-seznam-majetku")
        this.kolonkaSeznamZamestnancu = document.getElementById("kolonka-seznam-zamestnancu")
        this.kolonkaListinyDokladajiciUpadek = document.getElementById("kolonka-listiny-dokladajici-upadek")

        // Přílohy návrhu na povolení oddlužení
        this.kolonkaProhlaseniOPouceni = document.getElementById("kolonka-prohlaseni-o-pouceni")
        this.kolonkaSoucasnePrijmy = document.getElementById("kolonka-priloha-soucasne-prijmy")
        this.kolonkaMinulePrijmy = document.getElementById("kolonka-prijmy-za-12-mesicu")
        // this.kolonkaProhlaseniManzeluOMajetku = document.getElementById("kolonka-prohlaseni-manzelu-o-majetku")      Dočasně vypnuto, dokud nebude zapracována i varianta pro manžela

        // Další přílohy
        this.kolonkaDarovaciSmlouva = document.getElementById("kolonka-priloha-darovaci-smlouva")
        this.kolonkaRozsudekOVyzivnem = document.getElementById("kolonka-priloha-rozsudek-o-vyzivnem")

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
            // this.kolonkaProhlaseniManzeluOMajetku,                  Dočasně vypnuto, dokud nebude zapracována i varianta pro manžela

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
            // this.kolonkaProhlaseniManzeluOMajetku,                      Dočasně vypnuto, dokud nebude zapracována i varianta pro manžela
            this.kolonkaDarovaciSmlouva,
            this.kolonkaRozsudekOVyzivnem,
        ]
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



    vymazVolbu(kolonka){
        // vymaže dané kolonce volbu (tím, že jí nastaví na nevybráno)
        // také jí patřičně upraví atribut zaskrtnuti, na který reaguje CSS
        
        kolonka.selectedIndex = 0
        this._upravAtributZaskrtnuti(kolonka)
    }

    disableKolonka(kolonka, disabled){
        // nastaví kolonce hodnotu disabled na zadanou boolean hodnotu
        // pokud to znamená disabled=true, tak ji zrovna i dříve zvolenou hodnotu a atribut zaskrtnuti (pro potřeby CSS) nastaví na nevybráno

        kolonka.disabled=disabled
        if (disabled){
            this.vymazVolbu(kolonka)
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

    _jeNevyplnene(kolonka){
        // Vrací údaj o tom, zda daná kolonka je nevyplněná
        return (!kolonka.disabled && kolonka.value === this.optionPrazdne.VALUE)     // kolonka se považuje za nevyplněnou pouze pokud není deaktivovaná
    }

    _jeDiskutabilni(kolonka){
        // Vrací údaj o tom, zda daná kolonka má vyplněnou volbu 'diskutabilní'
        return kolonka.value === this.optionDiskutabilni.VALUE
    }

    _jeVadne(kolonka){
        // Vrací údaj o tom, zda daná kolonka má vyplněnou volbu 'vadné'
        return kolonka.value === this.optionVadne.VALUE
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
        return this._jeNecoZPredanychNejake(kolonky, kolonka => this._jeNevyplnene(kolonka))  // callback musíme předat arrow funkcí, jinak ztratíme kontext this, který má odkazovat na instanci formuláře     
    }

    _jeDiskutabilniNecoZ(kolonky){
        // Vrací údaj o tom, zda alespoň některá z předaných kolonek je diskutabilní
        return this._jeNecoZPredanychNejake(kolonky, kolonka => this._jeDiskutabilni(kolonka))
    }

    _jeVadneNecoZ(kolonky){
        // Vrací údaj o tom, zda alespoň některá z předaných kolonek je vadná
        return this._jeNecoZPredanychNejake(kolonky, kolonka => this._jeVadne(kolonka))
    }


    

}