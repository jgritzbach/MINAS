class SkupinaPolozekFormulare{
    // Třída reprezentuje určitou logickou skupinu položek formuláře, kterou je z nějakého důvodu vhodné držet seskupenou pohromadě

    constructor(nazevSkupiny, polozky){

            this.nazevSkupiny = nazevSkupiny
            this.polozky = polozky

    }

    get polozky(){
        return this._polozky
    }

    set polozky(skupinaPolozek){
        this._polozky = skupinaPolozek
    }


    add(polozka){
        this.polozky.push(polozka)
    }


}