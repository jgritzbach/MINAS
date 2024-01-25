class NavrhNaOddluzeniGenerator extends GeneratorObsahu{

    
    // Úkolem bude připravit elementy relevantní k dlužnickému návrhu na povolení oddlužení

    constructor(){
        
        super()

        //konstanty pro vytvoření kolonek
        this.idNalezitostiPlneMoci = 'nalezitosti-plne-moci'
        this.idNalezitostiFormyPodani = 'nalezitosti-formy-podani'
        this.idMistniPrislusnost = 'mistni-prislusnost'

        // formulář pro validaci kolonek
        

    }

    vygenerujObsah(){

        this._vytvorFormularNavrhuNaOddluzeni()
        this.formular = new NavrhNaOddluzeniFormular(this) // formuláři předáme odkaz na přidružený generátor obsahu, aby mohl formulář využít jeho konstant
        this._vytvorTlacitkoVyhodnoceni()


    }

    _vytvorTlacitkoVyhodnoceni(){
        const tlacitko = document.createElement('button')

        tlacitko.addEventListener('click', (event) => {

            event.preventDefault
            this.vypsatVyhodnoceniFormulare()

        })

        tlacitko.innerText = 'Vyhodnotit formulář'
        document.body.appendChild(tlacitko)
    }

    vypsatVyhodnoceniFormulare(){
        // později by měl tuto úlohu přebrat nějaký manager formuláře.
        // formulář sám by měl vyhodnocovat, ne vypisovat. To jsou dvě akce, které by se měly oddělit.
        // možná že by takový manažer formuláře, který by se staral o výpis, měl splynout s generátorem obsahu?

        this.vyhodnoceniFormulareDiv.innerHTML = this.formular.vyhodnotitKolonky()
    }

    _vytvorFormularNavrhuNaOddluzeni(){

        // metoda vytvoří HTML element formuláře reprezentujícího náležitosti návrhu na povolení oddlužení
        
        const HTMLformular = document.createElement('form')

        this._vytvorZaskrtavaciKolonku(HTMLformular, this.idNalezitostiPlneMoci, 'Náležitosti plné moci')
        this._vytvorZaskrtavaciKolonku(HTMLformular, this.idNalezitostiFormyPodani, 'Náležitosti formy podání')
        this._vytvorZaskrtavaciKolonku(HTMLformular, this.idMistniPrislusnost, 'Místní příslušnost')

        this.hlavniObsahDiv.appendChild(HTMLformular)

    }

    _vytvorZaskrtavaciKolonku(form, idKolonky, textLabelu){

        // vytvoří zadanému formuláři zaškrtávací kolonku
        // zaškrtávací kolonka je vlastně pár dvou elementů - <select> a přidruženého <label> 
        // <select> bude opatřen zadaným id a label bude mít vlastnost for nastavenou na zadané id -> tím dojde k propojení obou elementů
        // oba elementy budou vytvořeny a vloženy do zadaného formuláře

        const popisek = document.createElement('label')
        popisek.for = idKolonky.toString()
        popisek.innerText = textLabelu

        const volba = this._vytvorZaskrtavaciVolbu(idKolonky)

        form.appendChild(popisek)
        form.appendChild(volba)
        form.insertAdjacentHTML('beforeend', '<br>')

    }

    _vytvorZaskrtavaciVolbu(id){

        // Vytvoří a vrátí element <select> se čtyřmi možnostmi - prázdné, v pořádku, diskutabilní a vadné
        const volba = document.createElement('select')
        
        const prazdne = document.createElement('option')
        prazdne.value = ''
        prazdne.innerText = ''

        const vporadku = document.createElement('option')
        vporadku.value = this.VPORADKU
        vporadku.innerText = this.VPORADKU

        const diskutabilni = document.createElement('option')
        diskutabilni.value = this.DISKUTABILNI
        diskutabilni.innerText = this.DISKUTABILNI

        const vadne = document.createElement('option')
        vadne.value = this.VADNE
        vadne.innerText = this.VADNE

        volba.appendChild(prazdne)
        volba.appendChild(vporadku)
        volba.appendChild(diskutabilni)
        volba.appendChild(vadne)
        volba.className = 'zaskrtavaci-volba'
        volba.id = id.toString()

        return volba
        
    }



}