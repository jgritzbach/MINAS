class vypocetSrazek{
    // Tato třída slouží pro provádění výpočtů srážek (a contrario nezabavitelných částek) v oddlužení
    // Jde o obecnou třídu provádějící výpočty, bez jakékoliv návaaznosti na nějaké html elementy nebo formuláře
    
    // Díky obecné povaze výpočtů bez návaznosti na elementy ji lze využít kdykoliv a kdekoliv
    // K provedení výpočtů není potřeba třídu instanciovat, výpočet je static

    static vypocitatSrazku(soucetPrijmu, pocetVyzivovanychOsob){
        // Tato metoda ze součtu příjmů dlužníka vypočítá výši zákonné srážky
        // pokud se změní mechanika výpočtů, mělo by stačit provést změnu zde

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
        const zaVyzivovaneOsobyCelkem = pocetVyzivovanychOsob * zaVyzivovanouOsobu                      
        const celkemNezabavitelneNezaokrouhlene = nezabavitelnaCastka + zaVyzivovaneOsobyCelkem
        const celkemNezabavitelne = Math.ceil(celkemNezabavitelneNezaokrouhlene)    // Dlužníku nikdy nemůže v žádném případě zůtat méně než toto. Naopak mu pravděpodobně zůstane více, protože z určité části srazitelného příjmu lze zase strhnout jen 2/3 -> celková částka která mu zbyde, je kalkulována dále

        // 3) SAMOTNÝ VÝPOČET SRÁŽEK
        const postizitelnaCastPrijmu = soucetPrijmu - celkemNezabavitelne        // Od součtu veškerých příjmů odečteme vše nezabavitelné - tím získáme tu část příjmu, ze které lze obecně strhávat
        
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

        const postihnoutPomerneZaokrouhleno = Math.floor(postihnoutPomerne / 3) * 3 
        // postihnoutPomerne = Math.floor(postihnoutPomerne / 3) * 3   // část příjmu postižitelná poměrně musí být zaokrouhlena dolů na číslo dělitelné třemi

        // určení části příjmu, ze kterého lze strhnout úplně vše
        let postihnoutZcela     
        if (postihnoutPomerne < postizitelnaCastPrijmu){        // pokud jsou příjmy dlužníka vyšší, než kolik je strop poměrného postihování
            postihnoutZcela = (postizitelnaCastPrijmu - postihnoutPomerne).toFixed(2)    // pak tento přebytek už lze postihnout úplně celý (to už musí mít dlužník opravdu slušný příjem)
        } else {
            postihnoutZcela = 0                             // běžnější je, že dlužník se ke stropu ani neblíží a žádnou část příjmu proto nelze postihnout zcela
        }
        
        // konečná výše srážky
        let realnaSrazka = (postihnoutPomerneZaokrouhleno * 2/3) + postihnoutZcela  // dvě třetiny z poměrně postižitelné části příjmu a všechno z plně postižitelné části příjmu - to je výsledná srážka

        return realnaSrazka        
    }
 
}