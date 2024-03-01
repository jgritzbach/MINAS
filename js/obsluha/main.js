window.onload = ()=> {
    
    const formularNalezitostiOddluzeni = new FormularOddluzeni()
    const formularPrijmu = new FormularPrijmu()
    const formularVyzivovacichPovinnosti = new FormularVyzivovacichPovinnosti()


    const managerNalezitostiOddluzeni = new ManagerNalezitostiOddluzeni(formularNalezitostiOddluzeni, formularPrijmu, formularVyzivovacichPovinnosti)
    const managerSrazek = new ManagerSrazek(formularPrijmu, formularVyzivovacichPovinnosti)



    

    const napoveda = new Napoveda(`<p>Toto je text nápovědy</p><p>Je roztežný na více řádků</p><p>Měl by se umět sám schovat</p>`)
    napoveda.nastavZobrazovatele(document.getElementById('zobrazovatel-napovedy'))

    document.getElementById('zde-napoveda').appendChild(napoveda.div)

    
}