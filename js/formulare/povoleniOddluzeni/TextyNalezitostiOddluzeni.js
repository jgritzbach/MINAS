class TextyNalezitostiOddluzeni{
    // Aby obsahově dlouhé nezaplevelovaly kód tříd, které jich potřebují využít
    // budou existovat odděleně a třídy se na ně mohou odkazovat

    constructor(formular){

        this.formular = formular
    }

    napoveda = {

        "nalezitosti-plne-moci" : `
        
            <p>Aby mohl zpracovatel za dlužníka sepsat a podat návrh na povolení oddlužení, potřebuje k tomu od dlužníka <strong>plnou moc</strong>, kterou je pak povinen zaslat soudu spolu se samotným návrhem. Insolvenční zákon klade na plnou moc pro účely zahájení řízení přísné požadavky.</p>
            <p>Plná moc je jednostranný právní úkon, který musí dlužník učinit <em>písemně</em> a podepsat jej. Insolvenční zákon dále vyžaduje, aby tento podpis byl <strong>úředně ověřen</strong> (tj. byl opatřen tzv. <em>doložkou legalizace</em>). Toto ověření může provést například obecní úřad nebo pošta.</p>
            <p>Jelikož zpracovatel návrhu na povolení oddlužení je typicky osoba, která musí s insolvenčním soudem komunikovat povinně elektronicky (§ 80a IZ), bude plnou moc s úředně ověřeným podpisem třeba tzv. <strong>konvertovat</strong>, tedy opatřit <em>ověřovací doložkou konverze</em>.</p>
            <p>To zaručuje shodu elektronického dokumentu s původním listinným originálem. Vůči soudu je tak prokázáno, že ověřovací doložka legalizace nebyla do elektronického souboru s plnou mocí vložena např. úpravou dokumentu jako obrázku.</p>
            <p>Pro platnost doložky o konverzi je dále nezbytné, aby byl výstup z konverze opatřen <em>kvalifikovaným elektronickým podpisem</em> osoby, která konverzi provedla.</p>`,


        "nalezitosti-formy-podani" : `
        
            <p>Insolvenční zákon ukládá v § 80a povinnost těm subjektů, které mají <em>povinně zřízenou <strong>datovou schránku</strong></em>, komunikovat se soudem <strong>pouze v elektronické podobě</strong>.</p>
            <p>Všechny osoby, které jsou způsobilé za dlužníka sepsat a podat insolvenční návrh spojený s návrhem na povolení oddlužení dle § 390a odst. 1 IZ, mají povinně zřízenou datovou schránku. Proto může být návrh na povolení oddlužení zpravidla podán pouze elektronickou formou, a to včetně všech příloh. Výjimečně a pouze v odůvodněných případech může soud povolit výjimku.</p>
            <p>Pokud zpracovatel návrhu doručí soudu návrh či některou jeho přílohu v <em>listinné podobě</em>, vyzve ho soud, aby podání učinil <em>elektronicky</em>, tj. prostřednictvím <em>datové schránky</em> či <em>emailem s uznávaným elektronickým podpisem</em>. Není-li vada formy ani přes výzvu soudu odstraněna, soud takové podání odmítne.</p>`,
            //<p>Návrh samotný musí přijít z datové schránky (tím pádem samotný formulář návrhu nemusí být podepsán) nebo emailem s uznávaným elektronickým podpisem.</p>`,


        "tvrzeni-o-upadku" : `

            <p>Dlužník je dle § 103/2 IZ <strong>povinen tvrdit</strong> v návrhu takové rozhodující skutečnosti, ze kterých vyplývá, že je v úpadku anebo v hrozícím úpadku.</p>
            <p>Tato povinnost tvrdit nemůže být nahrazována tím, že dlužník k návrhu připojí listinné přílohy, ze kterých lze jeho úpadek vydedukovat - povinnosti tvrdit rozhodné skutečnosti přímo v insolvenčním návrhu jej to nezbavuje. Doloženými listinami se dlužník až následně snaží unést své důkazní břemeno, listiny však dle § 103/3 IZ nejsou součástí insolvenčního návrhu.</p>
            <p><em>Důkazní povinnost</em> a <em>povinnost tvrdit</em> rozhodující skutečnosti je třeba od sebe důsledně odlišovat, neboť jejich nesplnění má různé procesní následky.</p>
            <p>Pro tvrzení o úpadku je třeba tvrdit <strong>kumulativně</strong> tyto tři rozhodné skutečnosti:</p>
            <ol>
                <li>
                    <p>že má dlužník <strong>více věřitelů</strong> - alespoň dva věřitele musí v návrhu zcela konkrétně označit (celý název, IČO a sídlo u právnické osoby, případně jméno a bydliště u fyzické osoby - § 103 odst. 1 IZ)</p>
                </li>
                <li>
                    <p>že alespoň dva závazky vůči alespoň dvěma věřitelům jsou více než <strong>30 dnů po splatnosti</strong> - nestačí obecné tvrzení, je nezbytné uvést konkrétní datum splatnosti (přinejmenším uvést měsíc a rok)</p>
                </li>
                <li>
                    <p>že závazky není schopen plnit, tedy že je v <strong>platební neschopnosti</strong>) anebo že je <em>předlužen</em></p>
                </li>
            </ol>
            <p><strong>Platební neschopnost</strong> (coby třetí uvedený bod) lze založit na jedné z následujících podmínek:</p>
            <ol>
                <li>
                    <p>dlužník výslovně uvede, že <em>zastavil platby</em> podstatné části svých peněžitých závazků (měl by uvést kterých)</p>
                </li>
                <li>
                    <p>alespoň dva závazky jsou více jak <em>3 měsíce po splatnosti</em></p>
                </li>
                <li>
                    <p>některou ze <em>splatných</em> pohledávek není možné zcela uspokojit v exekuci (dlužníkův majetek v daný moment k úplnému uhrazení nepostačuje)</p>
                </li>
                <li>
                    <p>jedná se o věřitelský insolvenční návrh a dlužník na výzvu soudu dle § 128/3 IZ nepředložil seznamy majetku, závazků a zaměstnanců</p>
                </li>
            </ol>
            <p>Alternativou k <em>platební neschopnosti</em> je shora zmíněné <strong>předlužení</strong>. Týká se pouze právnických osob nebo fyzických osob podnikatelů. Osoba je předlužena, má-li více věřitelů a souhrn jejích závazků převyšuje hodnotu jejího majetku.</p>`,


        "mistni-prislusnost" : `
            
            <p>Aby soud mohl návrh dlužníka věcně projednat, musí být pro to splněny tzv. <em>podmínky řízení</em>, mezi nimi i <strong>místní příslušnost</strong>.</p>
            <p>Místní příslušnost se řídí zpravidla dle <em>bydliště</em> či <em>sídla</em> dlužníka. <a href="https://www.zakonyprolidi.cz/cs/2002-6#f2273426" target="_blank">Zákon o soudech a soudcích</a> přesně vymezuje, které okresní (a od toho odvozené krajské soudy) jsou místně příslušné dle bydliště dlužníka. Tento zákon pamatuje na každé město a každou obec v České republice.</p>
            <p>Pokud se liší dlužníkova trvalá adresa (zapsaná v centrální evidenci obyvatel) od adresy, kterou dlužník uvede jako korespondenční, a přitom alespoň jedna z těchto adresu spadá do místní příslušnosti jiného soudu, než u kterého byl návrh podán, je to důvod pro soud prověřit podmínku místní příslušnosti.</p>
            <p>Soud zpravidla dlužníka vyzve ke sdělení, na jaké adrese se zdržují s úmyslem žít tam trvale (dle § 80 občanského zákoníku).</p>
            <p>Pokud dlužník jako místo, kde se zdržuje s úmyslem žít tam trvale, označí adresu spadající do místní příslušnosti jiného krajského soudu, soud vysloví svou místní nepříslušnost a postoupí věc místně příslušnému soudu.</p>`,
            

        "seznam-majetku" : `
            <p>V <strong>seznamu majetku</strong> je dlužník povinen označit <em>jednotlivě</em> svůj majetek včetně pohledávek. U pohledávek má stručně uvést skutečnosti, na kterých se zakládají, a vyjádřit se k jejich dobytnosti.</p>
            <p>U majetku, ke kterému uplatňují práva třetí osoby (typicky zajištěný majetek, např. z titulu zástavní smlouvy) by měl dlužník tyto osoby označit a tento majetek nejlépe uvést odděleně.</p>
            <p>Seznam majetku musí dlužník <strong>vlastnoručně podepsat</strong> a výslovně v něm uvést prohlášení, že <strong>seznam je správný a úplný</strong>.</p>
            <p>Seznam závazků se při návrhu na povolení oddlužení již předkládat nemusí.</p>`,


        "seznam-zamestnancu" : `
            <p>Může se to zdát překvapivé, ale i dlužník, který nikdy neměl žádné své zaměstnance (nikdy nikoho nezaměstnával) je povinen předložit <strong>seznamu zaměstnanců</strong>.</p>
            <p>Pokud dlužník žádné zaměstnance nemá, je povinen tuto skutečnost <em>uvést výslovně</em>. Má-li nějaké zaměstnance, musí je označit alespoň jménem, příjmením a bydlištěm.</p>
            <p>Seznam zaměstnanců musí dlužník <strong>vlastnoručně podepsat</strong> a výslovně v něm uvést prohlášení, že <strong>seznam je správný a úplný</strong>.</p>`,
            
            
            
            
            
    
    }
    // 1) ,

    // 2)  a

    // 3) 


    //     `,

    // }

//     get napovedaPlnaMoc(){

//         return 
//     }

//     get napovedaFormaPodani(){

//         return

}





