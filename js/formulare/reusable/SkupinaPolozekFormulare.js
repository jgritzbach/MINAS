class SkupinaPolozekFormulare{
    // třída reprezentuje určitou logickou skupinu položek formuláře, kterou je z nějakého důvodu vhodné držet seskupenou pohromadě

    constructor(nazevSkupiny, polozky){

        this.nazevSkupiny = nazevSkupiny
        this.polozky = polozky

    }

    get nazevSkupiny(){
        return this._nazevSkupiny
    }

    set nazevSkupiny(nazev){
        this._nazevSkupiny = nazev
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