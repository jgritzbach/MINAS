class VypoctySrazekManager{
    // třída slouží pro manipulaci s formuláři příjmů a vyživovaných osob
    // na jejich základě umí spočítat výše srážek proveditelných z příjmů
    // formuláře sám si jen pamatují, které kolonky jsou jejich, co se v nich může vyplňovat, a umí posoudit, co v nich je
    // vůbec se však nestarají o to, proč by to někdo chtěl vědět, a nejsou nijak iniciativní.
    // Pokyny k vyhodnocení jim zadává tento manžer, stejně tak jako vyvození důsledků takového vyhodnocení





    constructor(){

        // this.divVyhodnoceniFormulare = document.getElementById("div-vyhodnoceni-formulare")

        this.formularPrijmu = new FormularPrijmu()
        this.formularVyzivovacichPovinnosti = new FormularVyzivovacichPovinnosti()
        
        this._pridatUdalostVyhodnoceni()

    }



    _pridatUdalostVyhodnoceni(){
        // ke každé relevantní kolonce formuláře příjmů nebo vyživovacích povinností se přidá další change event listener.
        // právě ten zavolá přepočet srážek při jakékoliv změně

        const fPrijmy = this.formularPrijmu
        const fVyziv = this.formularVyzivovacichPovinnosti

        // Zde určíme, kteréthis.vypocty kolonky jsou způsobilé vyvolat přepočet
        const cile = [... fPrijmy.vsechnyKolonkyVysePrijmu, fPrijmy.kolonkaVyseDaru, ...fVyziv.vsechnyKolonky]

        for (const kolonka of cile){
            kolonka.addEventListener('change', () => this.vypisVyhodnoceniFormulare())
        }


    }

    vypisVyhodnoceniFormulare(){
        //alert(this.formularPrijmu.soucetPrijmu())
    }



    vypocitatSrazku(){
        // Tato metoda ze všech údajů o příjmech dlužníka vypočítá výši zákonné srážky
        // relevantní input data se převezmou z patřičnýc kolonek v html formulářích
        // pokud se změní zákon, mělo by stačit provést změnu zde

        const p = this.formularPrijmu
        const v = this.formularVyzivovacichPovinnosti

        // 1) PEVNÉ HODNOTY - STEJNÉ PRO VŠECHNA ŘÍZENÍ
            
        // některá zákonná minima
        const zivotniMinimumJednotlivce = 4860              // tuto výši fixně stanoví nařízení vlády 595/2006 Sb. 
        const normativniNakladyNaBydleni = 15597                // Upravuje § 2 písm. a) nařízení vlády, kterým se pro účely příspěvku na bydlení ze státní sociální podpory pro rok xy. Číslo nařízení se mění každý rok (např. v roce 2019 to bylo č. 320/2018 Sb.). Při vyhldeání aktuálního předpise je vhodnější hledat dle názvu nařízení, které se až na číslovku roku nemění. Aktuální cifra by však měla být vždy uvedena v § 26 odst. 1 psím. a) zákona č. 117/1995 Sb., o státní sociální podpoře kalkuluje se vždy s jednou osobou v nájmením bytě v obci s počtem obyvatel 50 000 - 99 999 (dle § 1 odst. 1 nařízení 595/2006 Sb.). Od 1. 1. 2022 se objevila novela zákona č. 117/1995 Sb., o státní sociální podpoře, která nově zavedla § 26a. Ten obsahuje další navýšení normativních nákladů na bydlení, které se má přičíst k základním normativním nákladům (bylo časově omezené a platilo jen od 1.1.22 do 31.12.23). Pro jednu osobu (a to, že máme kalkulovat s jednou osobou, zřejmě opět plyne z § 1 odst. 1 nařízení 595/2006 Sb.?) to v roce 2022 činilo 1 120 Kč. 
        const soucetMinimaZivotaABydleni = zivotniMinimumJednotlivce + normativniNakladyNaBydleni

            
        // poměry, kterými se násobí některá základní minima - i ty už v minulosti zákonodárce změnil
        const nezabavitelnaCastka = 2/3 * soucetMinimaZivotaABydleni        // základní nezabavitelná částka jsou 2/3 ze součtu životního minima a normativních nákladů na bydlení
        const zaVyzivovanouOsobu = 1/3 * nezabavitelnaCastka                // za každou vyživovanou osobu se přičítá 1/3 základní nezabavitelné částky

        // 2) INDIVIDUÁLNÍ HODNOTY - dle okolností případu
            
        // základní nezabavitlené minimum dle počtu vyživovaných osob
        const zaVyzivovaneOsobyCelkem = v.pocetOsob()                       
        const celkemNezabavitelneNezaokrouhlene = nezabavitelnaCastka + zaVyzivovaneOsobyCelkem
        const celkemNezabavitelne = Math.ceil(celkemNezabavitelneNezaokrouhlene)    // Dlužníku nikdy nemůže v žádném případě zůtat méně než toto. Naopak mu pravděpodobně zůstane více, protože z určité části srazitelného příjmu lze zase strhnout jen 2/3 -> celková částka která mu zbyde, je kalkulována dále







    }


}