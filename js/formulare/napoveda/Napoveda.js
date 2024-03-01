class Napoveda{
    // třída reprezentuje objekt nějaké nápovědy nebo informativního textu
    // očekává se, že se bude chtít někde zobrazit
    // a naopak bude mít vlastní tlačítko na to se zase schovat
    // nápověda očekává, že bude přiřazena k něčemu

    constructor(htmlNapovedy){

        this.htmlNapovedy = htmlNapovedy    // samotný text nápovědy, který očekává, že už bude obalen elementy <p>
        
        this.tlacitkoSkryt = this._vytvorTlacitkoSkryt()       // tlačítko existuje jako samostatný objekt pro to, aby mu šly předávat event listenery a callbacky
        this.divNapovedy = this._vytvorElementNapovedy()
        this.skryjSe()

    }

    get div(){
        // vrátí svůj hlavní div, ve kterém je vloženo vše další
        return this.divNapovedy
    }

    skryjSe(){
        // celý svůj hlavní div schová
        this.divNapovedy.style.display = 'none'
    }

    ukazSe(){
        this.divNapovedy.style.display = 'block'
    }

    nastavZobrazovatele(element){
        // předaný element se stane tím, kdo způsobí zobrazení nápovědy

        element.addEventListener('click', (event) =>{
            event.preventDefault()
            this.ukazSe()
        })
    }

    _vytvorElementNapovedy(){
        // vytvoří html element nápovědy
        // jde o div, do kterého je vepsán htmlText nápovědy (zadané už v konstruktoru)
        // na závěr je vždy doplněno tlačítko pro skrytí, které už bylo vytvořeno dříve

        const element = document.createElement("div")

        element.classList.add('napoveda')
        // element.classList.add('oblast-vypisu')

        element.innerHTML = this.htmlNapovedy
                                    
        const skrytNapovedu = document.createElement('div')
        skrytNapovedu.classList.add('div-skryt-napovedu')

        skrytNapovedu.appendChild(this.tlacitkoSkryt)
        element.appendChild(skrytNapovedu)

        return element
    }

    _vytvorTlacitkoSkryt(){
        // vytvoří tlačítko skrýt nápovědu
        // tlačítko existuje jako samostatný objekt pro to, aby mu šly předávat event listenery a callbacky

        const btnSkryt = document.createElement('button')
        btnSkryt.classList.add('btn-skryt-napovedu')
        btnSkryt.innerHTML = `skrýt <span class="skryt-napovedu-sipka">^</span>`

        btnSkryt.addEventListener('click', (event) =>{
            event.preventDefault()
            this.skryjSe()
        })

        return btnSkryt
    }




}