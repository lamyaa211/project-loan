package net.nak.DTO;

import net.nak.enums.MotifDemande;
import java.util.Date;

public class DemandeIndemnisationEntrepDTO extends DemandeIndemnisationDTO{

    private Double capitalRestant;

    private MotifDemande motifDemande;

    private Date datePremImpaye;

    private Date dateDeclarationContentieux;

    public Double getCapitalRestant() {
        return capitalRestant;
    }

    public void setCapitalRestant(Double capitalRestant) {
        this.capitalRestant = capitalRestant;
    }

    public MotifDemande getMotifDemande() {
        return motifDemande;
    }

    public void setMotifDemande(MotifDemande motifDemande) {
        this.motifDemande = motifDemande;
    }

    public Date getDatePremImpaye() {
        return datePremImpaye;
    }

    public void setDatePremImpaye(Date datePremImpaye) {
        this.datePremImpaye = datePremImpaye;
    }

    public Date getDateDeclarationContentieux() {
        return dateDeclarationContentieux;
    }

    public void setDateDeclarationContentieux(Date dateDeclarationContentieux) {
        this.dateDeclarationContentieux = dateDeclarationContentieux;
    }
}
