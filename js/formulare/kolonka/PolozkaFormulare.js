class PolozkaFormulare{
    // třída reprezentuje položku nějakého formuláře
    // sestává na prvním místě z nějaké kolonky, kam se něco vyplňuje, typicky z nějakého elementu <select> nebo <input>
    // současně však také může mít přidružený label
    // a také může mít přidruženou nápovědu, kterou lze zobrazit nějakou událostí.

    constructor(kolonka){

        this.kolonka = kolonka  // kolonka je základní prvek položky -> je to to hlavní, bez čeho by nedávala smysl.        

    }

    get label(){
        return this._label
    }

    set label(elementLabel){
        this._label = elementLabel
    }
   
    


<div class="polozka-formulare" >
    <div class="radek-formulare">
        <select id="nalezitosti-formy-podani" class="zaskrtavaci-volba"></select>
        <label for="nalezitosti-formy-podani" class="label-napoveda" id="zobrazovatel-napovedy">Náležitosti formy podání</label>
    </div>
    <div class="oblast-vypisu vypis-ve-formulari" id="zde-napoveda">
    
    </div>
</div>

}