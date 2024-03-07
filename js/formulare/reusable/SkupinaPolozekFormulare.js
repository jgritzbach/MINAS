class SkupinaPolozekFormulare{
    // Třída reprezentuje určitou logickou skupinu položek formuláře, kterou je z nějakého důvodu vhodné držet seskupenou pohromadě

    constructor(nazevSkupiny, polozky){

            this.nazevSkupiny = nazevSkupiny
            this.polozky = polozky

    }

    add(polozka){
        this.polozky.push(polozka)
    }


}