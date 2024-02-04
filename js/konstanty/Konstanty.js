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
        PRAZDNE : 'nevybrano',
        V_PORADKU : 'v-poradku',
        DISKUTABILNI : 'diskutabilni',
        VADNE : 'vadne',
    }

    // potenciální stavy vyplněnosti kategorií
    static stavy = {
        VADNE_PLNA_MOC : 0,
        VADNE_FORMA_PODANI : 1,
        VADNE_TVRZENI_O_UPADKU : 2,
        VADNE_MISTNI_PRISLUSNOST : 3,
        VADNE_PRILOHY_INSOLVENCNIHO_NAVRHU : 4,
        VADNE_PRILOHY_NAVRHU_NA_ODDLUZENI : 5,
        NECO_NEVYPLNENE : 6,
        NECO_DISKUTABILNI : 7,
        VSE_OK : 8,
    }

}
