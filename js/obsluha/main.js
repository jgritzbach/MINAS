window.onload = ()=> {
    
    const formularNalezitostiOddluzeni = new FormularOddluzeni()
    const formularPrijmu = new FormularPrijmu()
    const formularVyzivovacichPovinnosti = new FormularVyzivovacichPovinnosti()


    const managerNalezitostiOddluzeni = new ManagerNalezitostiOddluzeni(formularNalezitostiOddluzeni, formularPrijmu, formularVyzivovacichPovinnosti)
    const managerSrazek = new ManagerSrazek(formularPrijmu, formularVyzivovacichPovinnosti)
    
}