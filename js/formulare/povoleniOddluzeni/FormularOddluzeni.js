class FormularOddluzeni{

    // Úkolem této třídy je uchopit elementy z html stránky, které slouží jako formulář náležitostí návrhu na oddlužení
    // Tyto náležitosti má umět vyhodnotit a vrátit výsledný stav
    // Sama o sobě tato třída nic nikam nevypisuje, k tomu může sloužit nějaký její manager

    constructor(){
        
        // kolonky s vyplněnými hodnotami (tj. elementy <select>)

        // Obecné náležitosti
        this.kolonkaPlneMoci = document.getElementById("nalezitosti-plne-moci")
        this.kolonkaFormaPodani = document.getElementById("nalezitosti-formy-podani")
        this.kolonkaMistniPrislusnost = document.getElementById("mistni-prislusnost")
        this.kolonkaTvrzeniOUpadku = document.getElementById("tvrzeni-o-upadku")

        // Přílohy insolvenčního návrhu
        this.kolonkaSeznamMajetku = document.getElementById("seznam-majetku")
        this.kolonkaSeznamZamestnancu = document.getElementById("seznam-zamestnancu")
        this.kolonkaListinyDokladajiciUpadek = document.getElementById("listiny-dokladajici-upadek")

        // Přílohy návrhu na povolení oddlužení
        this.kolonkaProhlaseniOPouceni = document.getElementById("prohlaseni-o-pouceni")
        this.kolonkaSoucasnePrijmy = document.getElementById("priloha-soucasne-prijmy")
        this.kolonkaMinulePrijmy = document.getElementById("prijmy-za-12-mesicu")
        this.kolonkaProhlaseniManzeluOMajetku = document.getElementById("prohlaseni-manzelu-o-majetku")

        // Další přílohy
        this.kolonkaDarovaciSmlouva = document.getElementById("priloha-darovaci-smlouva")
        this.kolonkaRozsudekOVyzivnem = document.getElementById("priloha-rozsudek-o-vyzivnem")


        this.kolonky = [
            this.kolonkaPlneMoci,
            this.kolonkaFormaPodani,
            this.kolonkaMistniPrislusnost,
            this.kolonkaTvrzeniOUpadku,

            this.kolonkaSeznamMajetku,
            this.kolonkaSeznamZamestnancu,
            this.kolonkaListinyDokladajiciUpadek,

            this.kolonkaProhlaseniOPouceni,
            this.kolonkaSoucasnePrijmy,
            this.kolonkaMinulePrijmy,
            this.kolonkaProhlaseniManzeluOMajetku, 

            this.kolonkaDarovaciSmlouva,
            this.kolonkaRozsudekOVyzivnem,
        ]

        this._nastavitPripustneHodnoty()
    }

    vyhodnotitKolonky(){

        // vyhodnotí vnitřní kolonky formuláře a vrátí stav:
        // 0 - něco chybí - nelze vyhodnotit
        // 1 - vše vyplněno, ale něco je vadné 
        // 2 - vše vyplněno, nic není vadné, ale něco je diskutabilní
        // 3 - vše vyplněno a v pořádku

        

        let hodnota, vadne, diskutabilni

        for (const kolonka of this.kolonky){
            hodnota = kolonka.innerText

            if (!hodnota){      // pokud někde absentuje vyplnění, rovnou víme, že nelze vyhodnotit
                return Konstanty.NECO_CHYBI 
            } else if (hodnota === Konstanty.VADNE){
                vadne = true;
            } else if (hodnota === Konstanty.DISKUTABILNI){
                diskutabilni = true;
            }
        
        }   

            
        if (vadne){
            return Konstanty.NECO_VADNE 
        }
        
        if (diskutabilni){
            return Konstanty.NECO_DISKUTABILNI
        }
        
        return Konstanty.VSE_OK 

    }


    _nastavitPripustneHodnoty(){
        // všem <selection> kolonkám nastaví jako přípustnou volbu zaškrtávací možnosti v pořádku / diskutabilní / vadné

        for (const kolonka of this.kolonky){
            this._vytvorZaskrtavaciVolbu(kolonka)
        }

    }


   

    _vytvorZaskrtavaciVolbu(selectElement){

        // Vytvoří čtyři <option> s hodnotami prázdné, v pořádku, diskutabilní, vadné
        // všechny budou přiřazeny jako dceřinný element zadanému <selection>
        

        // nastavíme attributy, které se budou přiřazovat pro jednotlivé <option> jako jejich value a pro celý <select> jako součást jeho class atributu
        const attrVolby = {}        
        attrVolby['vychozi'] = 'zaskrtnuto-nevybrano'
        attrVolby[Konstanty.V_PORADKU] = 'zaskrtnuto-v-poradku'
        attrVolby[Konstanty.DISKUTABILNI] = 'zaskrtnuto-diskutabilni'
        attrVolby[Konstanty.VADNE] = 'zaskrtnuto-vadne'

        selectElement.className = `${selectElement.className} ${attrVolby['vychozi']}`     // class attribute elementu <select> se doplní o výchozí volbu, kterým je "nevybráno"


        // tvorba a nastavení jednotlivých zaškrtávacích <option>

        const prazdne = document.createElement('option')
        prazdne.value = attrVolby['vychozi']
        prazdne.innerText = ''

        const vporadku = document.createElement('option')
        vporadku.value = attrVolby[Konstanty.V_PORADKU]
        vporadku.class = attrVolby[Konstanty.V_PORADKU]
        vporadku.innerText = Konstanty.V_PORADKU

        const diskutabilni = document.createElement('option')
        diskutabilni.value = attrVolby[Konstanty.DISKUTABILNI]
        vporadku.class = attrVolby[Konstanty.DISKUTABILNI]
        diskutabilni.innerHTML = Konstanty.DISKUTABILNI

        const vadne = document.createElement('option')
        vadne.value = attrVolby[Konstanty.VADNE]
        vporadku.class = attrVolby[Konstanty.VADNE]
        vadne.innerText = Konstanty.VADNE


        // přiřazení vytvořených <option> do <select> 
        selectElement.appendChild(prazdne)
        selectElement.appendChild(vporadku)
        selectElement.appendChild(diskutabilni)
        selectElement.appendChild(vadne)

        
        // zachycení události <select> change -> každá změna přepíše dosavadní volbu na tu novou


        selectElement.addEventListener('change', () =>{

            // při zvolení některé <option> dojde k tomu, že se <option>.value přepíše do <select>.class namísto toho, co tam bylo předtím
            // právě to, že součástí class elementu <select> bude to, jaká volba tam právě panuje, umožní CSS nastavit odpovídající barvu
            // CSS selektor     select option[value="v-poradku"]:checked       totiž ve většině prohlížečů bohužel nefunguje
            // tvrdý zásah do <select>.class je tak zřejmě jediný způsob, jak dosáhnout přebarvení <select>
            
            const optionValue = selectElement.options[selectElement.selectedIndex].value  // uchopíme element <option>,který byl právě zvolen .value

            for (const attrVolba in attrVolby){                           // iterujeme napříč volbami, které známe: zaskrtnuto-nevybrano, zaskrtnuto-v-poradku atd.

                const zaskrtnuto = attrVolby[attrVolba]
                if (selectElement.className.includes(zaskrtnuto)){       // jestliže se v současném attributu class elementu <select> vyskytuje iterovaná fráze
                    const newClassName = selectElement.className.replace(zaskrtnuto, optionValue) 
                    selectElement.className = newClassName     // nahradíme v <select> class dosavadní frázi tím, co má zvolený <option> ve value
                    break       // a můžeme rovnou skončit (nepředpokládá se, že by <select> mohl mít více zaškrtnutých voleb najednou)
                } 
            }
                
        

        })


    }




}