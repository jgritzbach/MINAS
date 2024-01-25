class FormularOddluzeni{

    // Úkolem této třídy je uchopit elementy z html stránky, které slouží jako formulář náležitostí návrhu na oddlužení
    // Tyto náležitosti má umět vyhodnotit a vrátit výsledný stav
    // Sama o sobě tato třída nic nikam nevypisuje, k tomu může sloužit nějaký její manager

    constructor(){
        
        // kolonky s vyplněnými hodnotami (tj. elementy <select>)
        this.kolonkaPlneMoci = document.getElementById("nalezitosti-plne-moci")
        this.kolonkaFormaPodani = document.getElementById("nalezitosti-formy-podani")
        this.kolonkaMistniPrislusnost = document.getElementById("mistni-prislusnost")

        this.kolonky = [
            this.kolonkaPlneMoci,
            this.kolonkaFormaPodani,
            this.kolonkaMistniPrislusnost,
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
            hodnota = kolonka.value

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
        // všem <selection> nastaví jako přípustnou volbu zaškrtávací možnosti v pořádku / diskutabilní / vadné

        for (const kolonka of this.kolonky){
            this._vytvorZaskrtavaciVolbu(kolonka)
        }

    }


   

    _vytvorZaskrtavaciVolbu(selectElement){

        // Vytvoří čtyři <option> s hodnotami prázdné, v pořádku, diskutabilní, vadné
        // všechny budou přiřazeny jako dceřinný element zadanému <selection>
                
        const prazdne = document.createElement('option')
        prazdne.value = ''
        prazdne.innerText = ''

        const vporadku = document.createElement('option')
        vporadku.value = Konstanty.V_PORADKU
        vporadku.innerText = Konstanty.V_PORADKU

        const diskutabilni = document.createElement('option')
        diskutabilni.value = Konstanty.DISKUTABILNI
        diskutabilni.innerText = Konstanty.DISKUTABILNI

        const vadne = document.createElement('option')
        vadne.value = Konstanty.VADNE
        vadne.innerText = Konstanty.VADNE

        selectElement.appendChild(prazdne)
        selectElement.appendChild(vporadku)
        selectElement.appendChild(diskutabilni)
        selectElement.appendChild(vadne)

    }




}