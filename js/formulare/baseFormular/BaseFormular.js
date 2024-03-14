class BaseFormular{
    // obecná třída jakéhokoliv formuláře, kde se mohou sdružovat všechny metody společné všem formulářům

    constructor(){

    }

    _nastavNapovedy(polozky, TextyClass){
        // očekává pole položek (třída PolozkaFormulare) a třídu, která slouží jako skladiště textů
        // u každé položky se podívá do textů, zda pod ID atributem iterované položky je k dispozici nějaký text
        // pokud ano, vytvoří k iterované položce nápovědu
    
        const t = new TextyClass()
    
        for (const polozka of polozky){
    
            const text = t.napoveda[polozka.obecnyNazev]        // zdrojem textů je samostatná třída, aby texty nezaplevelovaly logiku formuláře
    
            if (text){      // je-li dostupný nějaký text nápovědy
                polozka.nastavNapovedu(polozka.popisek, text)       // nápověda se vytvoří
            }
    
        }
    }
} 
                                