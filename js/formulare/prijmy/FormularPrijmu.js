class FormularPrijmu{

    // Tento formulář bude sloužit k zadávání dat o příjmech dlužníka.
    // Bude se zde vyplňovat typ příjmu a jeho výše
    // Bude se vyplňovat zaměstnavatel, což ale nebude povinné
    // k dosazení zaměstavatele půjde využít AresApiClient - postačí IČO a dosadí se všechny údaje z ARES
    // To samo stačí na výpočet nezabavitelné částky a contrario k určení výše srážek
    // Od toho se ještě budou odečítat případné vyživovací povinnosti dlužníka, jsou-li nějaké
    // Nebude-li ve formuláři vyživovacích povinností nic vyplněno, má se za to, že žádné nejsou
    // Bude-li něco vyplněno, výpočet srážek bude o to ponížen
    
   

}

class FormularVyzivovacichPovinnosti{

    // Samostatným formulářem by mohlY být vyživovací povinnosti dlužníka
    // zde by se zadal počet vyživovaných osob
    // dále případné výživné stanovené soudem a případná výše dluhu na něm
    // Výše srážek určená prvním formulářem bude následně ponížena o všechny vyživovací povoinnosti
    // teprve tím se dospěje k částce, kterou lze nabídnout věřitelům
    // nebude-li tento formulář vyplněn, bude výpočet předpokldádat, že žádné vyživovací povinnosti zde nejsou


}