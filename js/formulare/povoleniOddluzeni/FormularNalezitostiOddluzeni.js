class FormularOddluzeni{

    // Úkolem této třídy je uchopit elementy z html stránky, které slouží jako formulář náležitostí návrhu na oddlužení
    // Tyto náležitosti má umět vyhodnotit a vrátit výsledný stav
    // Sama o sobě tato třída nic nikam nevypisuje, k tomu může sloužit nějaký její manager

    constructor(){

        this._uchopPolozky()                     // uchopíme všechny položky - obecné divy, kde je kolonka, label i kontejner pro nápovědu
        this._uchopKolonky()                     // v rámci položek uchopíme samostatně takéjenom položky 

        this._nastavPovoleneVolby()              // v rámci zaškrtávacích <selectů> jsou povolené volby 'prázdné', 'v pořádku', 'diskutabilní' a 'vadné'
        this._nastavKolonky()                    // kolonkám nastavíme povolené volby a reakce na ně

        this._nastavNapovedy()
    }


    _nastavKolonky(){
        // všem <select> kolonkám nastaví jako přípustnou volbu zaškrtávací možnosti v pořádku / diskutabilní / vadné
        // a nastaví jim také reakci na změnu

        for (const kolonka of this.vsechnyKolonky){
            this._nastavZaskrtavaciVolby(kolonka)
            this._nastavReakciNaVolbu(kolonka)
        }

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

        this.vsechnyPolozky = [
            this.polozkaPlneMoci,
            this.polozkaFormaPodani,
            this.polozkaTvrzeniOUpadku,
            // this.polozkaMistniPrislusnost,

            // this.polozkaSeznamMajetku,
            // this.polozkaSeznamZamestnancu,
            // this.polozkaListinyDokladajiciUpadek,

            // this.polozkaProhlaseniOPouceni,
            // this.polozkaSoucasnePrijmy,
            // this.polozkaMinulePrijmy,
            // // this.polozkaProhlaseniManzeluOMajetku, Dočasně vypnuto, dokud nebude zapracována i varianta pro manžela

            // this.polozkaDarovaciSmlouva,
            // this.polozkaRozsudekOVyzivnem,
        ]

    }

    _uchopKolonky(){
        
        // ze vše svých položek vytahá kolonky, protože se s nimi velice často pracuje samostatně, v cyklech, a dotazy z cizích objektů

        // Obecné náležitosti
        this.kolonkaPlneMoci = this.polozkaPlneMoci.kolonka
        this.kolonkaFormaPodani = this.polozkaFormaPodani.kolonka 
        this.kolonkaTvrzeniOUpadku = this.polozkaTvrzeniOUpadku.kolonka
        this.kolonkaMistniPrislusnost = this.polozkaMistniPrislusnost.kolonka

        // Přílohy insolvenčního návrhu
        this.kolonkaSeznamMajetku = this.polozkaSeznamMajetku.kolonka
        this.kolonkaSeznamZamestnancu = this.polozkaSeznamZamestnancu.kolonka
        this.kolonkaListinyDokladajiciUpadek = this.polozkaListinyDokladajiciUpadek.kolonka

        // Přílohy návrhu na povolení oddlužení
        this.kolonkaProhlaseniOPouceni = this.polozkaProhlaseniOPouceni.kolonka
        this.kolonkaSoucasnePrijmy = this.polozkaSoucasnePrijmy.kolonka
        this.kolonkaMinulePrijmy = this.polozkaMinulePrijmy.kolonka
        // this.kolonkaProhlaseniManzeluOMajetku = this.polozkaProhlaseniManzeluOMajetku.kolonka      Dočasně vypnuto, dokud nebude zapracována i varianta pro manžela

        // Další přílohy
        this.kolonkaDarovaciSmlouva = this.polozkaDarovaciSmlouva.kolonka
        this.kolonkaRozsudekOVyzivnem = this.polozkaRozsudekOVyzivnem.kolonka

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


    

    _nastavNapovedy(){

        const t = new TextyNalezitostiOddluzeni(this)

        for (const polozka of this.vsechnyPolozky){

            polozka.nastavNapovedu(polozka.popisek, t.napoveda[polozka.obecnyNazev])

        }

                                    
    }

}