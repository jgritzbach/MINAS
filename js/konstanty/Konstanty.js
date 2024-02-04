class Konstanty{
    
    // Zaškrtávací volby - texty
    static volbyTexty = {
        PRAZDNE : "",
        V_PORADKU : "\u2714 v pořádku",
        DISKUTABILNI : "? diskutabilní",
        VADNE : "\u2717 vadné",
    }

    // zakšrtávací volby - values
    static volbyValues = {
        PRAZDNE : 'zaskrtnuto-nevybrano',
        V_PORADKU : 'zaskrtnuto-v-poradku',
        DISKUTABILNI : 'zaskrtnuto-diskutabilni',
        VADNE : 'zaskrtnuto-vadne',
    }


    // potenciální stavy vyplněnosti kategorií
    static stavy = {
        NECO_CHYBI : 0,
        NECO_VADNE : 1,
        NECO_DISKUTABILNI : 2,
        VSE_OK :3, 
    }

}
