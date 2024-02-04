class FormularOddluzeniManager{

    // třída slouží pro manipulaci s formulářem
    // formulář sám si jen pamatuje, které kolonky jsou jeho, co se v nich může vyplňovat, a umí posoudit, co v nich je
    // vůbec se však nestará o to, proč by to někdo chtěl vědět, a sám nic nedělá.
    // Pokyny k vyhodnocení mu zadává tento manžer, stejně tak jako vyvození důsledků takového vyhodnocení

    constructor(){

        this.tlacitkoVyhodnotit = document.getElementById("vyhodnotit-navrh-na-oddluzeni")
        this.vyhodnoceniFormulare = document.getElementById("vyhodnoceni-formulare")
        this._pridatUdalostVyhodnoceni()


        this.formular = new FormularOddluzeni()

        
        

    }


    vypisVyhodnoceniFormulare(){


        // const hodnoceni = {
        //     0: '<br>Doposud nebyly vyplněny všechny potřebné kolonky.<br>Návrh na povolení oddlužení nelze vyhodnotit.',
        //     1: '<br>Některá z kolonek byla vyhodnocena jako vadná.<br>Návrh na povolení oddlužení pravděpodobně nebude úspěšný.',
        //     2: '<br>Některá z kolonek byla vyhodnocena jako diskutabilní.<br>Úspěch návrhu na povolení je nejistý, v závislosti na závažnosti okolností.',
        //     3: '<br>Všechny kolonky byly vyhodnoceny jako v pořádku.<br>Zdá se, že návrh na povolení my mohl u soudu obstát.',
        // }

        let vysledek = this.formular.vyhodnotKolonky()
        this.vyhodnoceniFormulare.innerHTML = vysledek

    }
    

    _pridatUdalostVyhodnoceni(){

        this.tlacitkoVyhodnotit.addEventListener('click', (event) => {
            event.preventDefault()
            this.vypisVyhodnoceniFormulare()
        })

    }

}