class NavrhNaOddluzeniGenerator extends GeneratorObsahu{

    
    // Úkolem bude připravit elementy relevantní k dlužnickému návrhu na povolení oddlužení

    constructor(){
        
        super()

    }

    vygenerujObsah(){

        this._vytvorFormularNavrhuNaOddluzeni()


    }
    _vytvorFormularNavrhuNaOddluzeni(){

        // metoda vytvoří element formuláře reprezentujícího náležitosti návrhu na povolení oddlužení
        
        const formular = document.createElement('form')

        this._vytvorZaskrtavaciKolonku(formular, 'nalezitosti-plne-moci', 'Náležitosti plné moci')
        this._vytvorZaskrtavaciKolonku(formular, 'nalezitosti-formy-podani', 'Náležitosti formy podání')
        this._vytvorZaskrtavaciKolonku(formular, 'nalezitosti-mistni-prislusnost', 'Místní příslušnost')

        this.hlavniObsah.appendChild(formular)

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
        prazdne.value = 'prazdne'
        prazdne.innerText = ''

        const vporadku = document.createElement('option')
        vporadku.value = 'v-poradku'
        vporadku.innerText = this.VPORADKU

        const diskutabilni = document.createElement('option')
        diskutabilni.value = 'diskutabilni'
        diskutabilni.innerText = this.DISKUTABILNI

        const vadne = document.createElement('option')
        vadne.value = 'vadne'
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