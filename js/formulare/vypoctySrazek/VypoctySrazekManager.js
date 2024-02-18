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
        
        this.divVypocetSrazek = document.getElementById("div-vypocet-srazek")
        this._pridatUdalostVyhodnoceni()

    }



    _pridatUdalostVyhodnoceni(){
        // ke každé relevantní kolonce formuláře příjmů nebo vyživovacích povinností se přidá další change event listener.
        // právě ten zavolá přepočet srážek při jakékoliv změně

        const fPrijmy = this.formularPrijmu
        const fVyziv = this.formularVyzivovacichPovinnosti

        // Zde určíme, které kolonky jsou způsobilé vyvolat přepočet
        const cile = [... fPrijmy.vsechnyKolonkyVysePrijmu, fPrijmy.kolonkaVyseDaru, ...fVyziv.vsechnyKolonky]

        for (const kolonka of cile){
            kolonka.addEventListener('change', () => this.vypisVyhodnoceniFormulare())
        }


    }

    vypisVyhodnoceniFormulare(){
        let text, srazka, zustatek
        srazka = this.vypocitatSrazku()     // díky uložení výše srážky do mezivýpočtu ušetříme jeden výpočet navíc
        zustatek = this.kolikZustane(srazka)    // zůstatek pro dlužníka vypočítáme již se znalostí jednou vypočítané srážky
        text = `Z příjmů dlužníka lze provést srážku: ${srazka} Kč.<br/><br/>
                Dlužníku měsíčně zůstane ${zustatek} Kč.`
        
        this.divVypocetSrazek.innerHTML = text
    }



    vypocitatSrazku(){
        // Tato metoda ze všech údajů o příjmech dlužníka vypočítá výši zákonné srážky
        // relevantní input data se převezmou z patřičných kolonek v html formulářích
        // pokud se změní zákon, mělo by stačit provést změnu zde

        const p = this.formularPrijmu
        const v = this.formularVyzivovacichPovinnosti

        // 1) PEVNÉ HODNOTY - STEJNÉ PRO VŠECHNA ŘÍZENÍ
            
        // některá zákonná minima
        const zivotniMinimumJednotlivce = 4860              // tuto výši fixně stanoví nařízení vlády 595/2006 Sb. 
        const normativniNakladyNaBydleni = 15597                // Upravuje § 2 písm. a) nařízení vlády, kterým se pro účely příspěvku na bydlení ze státní sociální podpory pro rok xy. Číslo nařízení se mění každý rok (např. v roce 2019 to bylo č. 320/2018 Sb.). Při vyhldeání aktuálního předpise je vhodnější hledat dle názvu nařízení, které se až na číslovku roku nemění. Aktuální cifra by však měla být vždy uvedena v § 26 odst. 1 psím. a) zákona č. 117/1995 Sb., o státní sociální podpoře kalkuluje se vždy s jednou osobou v nájmením bytě v obci s počtem obyvatel 50 000 - 99 999 (dle § 1 odst. 1 nařízení 595/2006 Sb.). Od 1. 1. 2022 se objevila novela zákona č. 117/1995 Sb., o státní sociální podpoře, která nově zavedla § 26a. Ten obsahuje další navýšení normativních nákladů na bydlení, které se má přičíst k základním normativním nákladům (bylo časově omezené a platilo jen od 1.1.22 do 31.12.23). Pro jednu osobu (a to, že máme kalkulovat s jednou osobou, zřejmě opět plyne z § 1 odst. 1 nařízení 595/2006 Sb.?) to v roce 2022 činilo 1 120 Kč. 
        const soucetMinimaZivotaABydleni = zivotniMinimumJednotlivce + normativniNakladyNaBydleni

        // poměry, kterými se násobí některé hodnoty - v minulosti je zákonodárce už několikrát změnil
        const nezabavitelnaCastka = 2/3 * soucetMinimaZivotaABydleni        // základní nezabavitelná částka jsou 2/3 ze součtu životního minima a normativních nákladů na bydlení
        const zaVyzivovanouOsobu = 1/4 * nezabavitelnaCastka                // za každou vyživovanou osobu se přičítá 1/3 základní nezabavitelné částky
        const postizitelnePomerne = 2 * soucetMinimaZivotaABydleni    // dvojnásobek součtu životního minima a normativních nákladů na bydlení zaokrouhlený dolů na číslo dělitelné třemi - to je část postižitelného příjmů, ze kterého lze strhnout jen poměrnou část (aktuálně 2/3 ale zákonodárce může toto časem změnit). Nad tuto hodnotu už se pak strhává všechno

        // 2) INDIVIDUÁLNÍ HODNOTY - dle okolností případu
            
        // základní nezabavitelné minimum dle počtu vyživovaných osob
        const zaVyzivovaneOsobyCelkem = v.pocetOsob() * zaVyzivovanouOsobu                      
        const celkemNezabavitelneNezaokrouhlene = nezabavitelnaCastka + zaVyzivovaneOsobyCelkem
        const celkemNezabavitelne = Math.ceil(celkemNezabavitelneNezaokrouhlene)    // Dlužníku nikdy nemůže v žádném případě zůtat méně než toto. Naopak mu pravděpodobně zůstane více, protože z určité části srazitelného příjmu lze zase strhnout jen 2/3 -> celková částka která mu zbyde, je kalkulována dále

        // 3) SAMOTNÝ VÝPOČET SRÁŽEK
        const postizitelnaCastPrijmu = p.getSoucetPrijmu() - celkemNezabavitelne        // Od součtu veškerých příjmů odečteme vše nezabavitelné - tím získáme tu část příjmu, ze které lze obecně strhávat
        
        // nelze-li postihnout vůbec, nemusíme nic dále počítat, srážka je nula
        if (postizitelnaCastPrijmu <= 0) {  
            return 0
        }

        // určení části příjmu, ze kterého lze srazit 2/3
        let postihnoutPomerne
        if (postizitelnaCastPrijmu > postizitelnePomerne) {
            postihnoutPomerne = postizitelnePomerne     // jestliže postižitelný příjem převyšuje hodnotu, která je stanovena jako strop pro poměrné srážky, bude to strop
        } else {
            postihnoutPomerne = postizitelnaCastPrijmu      // jinak je celý postižitelný příjem postižitelný jen poměrně
        }

        postihnoutPomerne = Math.floor(postihnoutPomerne / 3) * 3   // část příjmu postižitelná poměrně musí být zaokrouhlena dolů na číslo dělitelné třemi

        // určení části příjmu, ze kterého lze strhnout úplně vše
        let postihnoutZcela     
        if (postihnoutPomerne < postizitelnaCastPrijmu){        // pokud jsou příjmy dlužníka vyšší, než kolik je strop poměrného postihování
            postihnoutZcela = postizitelnaCastPrijmu - postihnoutPomerne    // pak tento přebytek už lze postihnout úplně celý (to už musí mít dlužník opravdu slušný příjem)
        } else {
            postihnoutZcela = 0                             // běžnější je, že dlužník se ke stropu ani neblíží a žádnou část příjmu proto nelze postihnout zcela
        }
        
        // konečná výše srážky
        let realnaSrazka = (postihnoutPomerne * 2/3) + postihnoutZcela  // dvě třetiny z poměrně postižitelné části příjmu a všechno z plně postižitelné části příjmu - to je výsledná srážka

        return realnaSrazka        
    }

    
    kolikZustane(vyseSrazky = 0){
        // spočítá, kolik dlužníku zůstane
        // kvůli úspoře výpočtu můžeme již výši srážky předat, pokud je nám již známa (tuto metodu můžeme volat jak při automatizovaných výpočtech, tak i jindy)
        // jinak se výše srážky spočítá teď

        if (!vyseSrazky){
            vyseSrazky = this.vypocitatSrazku()
        }

        return this.formularPrijmu.getSoucetPrijmu() - vyseSrazky
    }


}