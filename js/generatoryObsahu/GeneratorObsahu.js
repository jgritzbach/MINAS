class GeneratorObsahu{

    // Třída bude sloužit jako šablona k vygenerování obsahu do základní html stránky
    // 

    constructor(){

        this.hlavniObsahDiv = document.getElementById('hlavni-obsah')
        this.vyhodnoceniFormulareDiv = document.getElementById('vyhodnoceni-formulare')

        // konstanty zaškrtávacích výběrů
        this.VPORADKU = "\u2714 v pořádku"
        this.DISKUTABILNI = "? diskutabilní"
        this.VADNE = "\u2717 vadné"
        
    }


}