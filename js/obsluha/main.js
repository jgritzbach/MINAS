window.onload = ()=> {
    
    const formularNalezitostiOddluzeni = new FormularOddluzeni()
    const formularPrijmu = new FormularPrijmu()
    const formularVyzivovacichPovinnosti = new FormularVyzivovacichPovinnosti()


    const formularOddluzeniManager = new FormularOddluzeniManager(formularNalezitostiOddluzeni, formularPrijmu, formularVyzivovacichPovinnosti)
    const vypoctySrazekManager = new VypoctySrazekManager(formularPrijmu, formularVyzivovacichPovinnosti)
    
}