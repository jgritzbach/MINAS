class TextyVyzivovaneOsoby{
    // aby obsahově dlouhé texty nezaplevelovaly kód tříd, které jich potřebují využít
    // budou existovat odděleně a třídy se na ně mohou odkazovat
    // jelikož se tyto texty zobrazují jen u klienta, není zatím potřeba je načítat z žádné databáze

    static napoveda = {

        "pocet-vyzivovanych-osob-dluznika" : `
        
            <p>Zákon <em>rozlišuje</em> vyživované osoby ve společné domácnosti (tzv. <strong>zákonnou vyživovací povinnost</strong>) a vyživované osoby, ke kterým bylo dlužníku uloženo platit <strong>výživné rozhodnutím soudu</strong>.</p>
            <p>Vyživované osoby ze zákona jsou typicky manžel(ka) a děti ve společné domácnosti. Společná domácnost není přímo podmínkou. Podstatné je, že dlužník má vyživovací povinnost plynoucí z občanského práva a tato nebyla upravena soudním rozhodnutím.</p>
            <p>Naproti tomu jsou osoby, ke kterým bylo výživné stanoveno opatrovnickým soudem. Typicky jde o děti mimo společnou domácnost, které byly soudem svěřeny do péče jiné osoby.</p>
            <p>Vůči jedné osobě může mít dlužník vyživovací povinnost buďto v <em>zákonné formě</em> nebo ve formě <em>soudem stanoveného výživného</em>. <strong>Obě formy se navzájem vylučují</strong>. Nemohou existovat vedle sebe, ani se kombinovat.</p>
            <p>Ač se to může zdát zvláštní, má-li dlužník manžela, považuje se automaticky za vyživovanou osobu ze zákona, a to i když spolu již nežijí. Dokud nedojde k rozvodu manželství, vyživovací povinnost k manželu trvá.</p>
            <p>Vyživované osoby <em>ze zákona</em> se promítají do výpočtu nezabavitelné částky. Čím více vyživovaných osob, tím méně lze z vlastních příjmů dlužníka srážet.</p>
            <p>U <em>výživného stanoveného soudem</em> se vyživovaná osoba do výpočtu nezabavitelné částky nijak nepromítá (dlužníku se tedy srazí, jakoby tuto osobu nevyživoval). Ze sražené částky se však výživné uspokojuje přednostně před pohledávkami věřitelů.</p>`,

        "mesicni-vyzivne" : `
        
            <p>U <strong>výživného stanoveného soudem</strong> se vyživovaná osoba do výpočtu nezabavitelné částky nijak nepromítá (dlužníku se tedy srazí, jakoby tuto osobu nevyživoval). Ze sražené částky se však výživné uspokojuje přednostně před pohledávkami věřitelů. Ještě před tím se však musí uspokojit <em>odměna a hotové výdaje</em> insolvenčního správce a případně <em>dlužné výživné</em>.</p>
            <p>Za výživné stanovené soudem se považuje také pouhé schválení <em>dohody rodičů</em> opatrovnickým soudem. Mimosoudní dohody rodičů o výši výživného (tedy bez schválení opatrovnickým soudem) však insolvenční soud často neakceptuje. V takovém případě se dítě místo toho zohlední přímo ve výpočtu srážek jako vyživovaná osoba ze zákona (kolonka výše).</p>
            <p>V případě, že v této aplikaci vyplníte tuto kolonku, začne se ve formuláři náležitostí návrhu na povolení oddlužení vyžadovat nová příloha - doložení kopie rozsudku o výživném.</p>`,
        
        "dluzne-vyzivne" : `
        
            <p>Bylo-li dlužníku opatrovnickým soudem uloženo platit <em>výživné</em> (zpravidla každý měsíc), pak na tomto výživném mohl také vzniknout <strong>dluh</strong>.</p>
            <p>Dluh na výživném se v oddlužení hradí <strong>přednostně</strong> před <em>pohledávkami věřitelů</em>, a dokonce i před řádným <em>měsíčním výživným</em>. <em>Odměna a hotové výdaje</em> insolvenčního správce však mají stále přednost. Insolvenční zákon tedy prioritizuje insolvenčního správce i před dlužným výživným.</p>
            <p>V případě, že v této aplikaci vyplníte tuto kolonku, začne se ve formuláři náležitostí návrhu na povolení oddlužení vyžadovat nová příloha - doložení kopie rozsudku o výživném.</p>`,
        
    }   

}





