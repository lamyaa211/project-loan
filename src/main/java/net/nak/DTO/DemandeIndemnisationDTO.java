package net.nak.DTO;

import net.nak.entities.Annexe;

import java.util.Date;

public class DemandeIndemnisationDTO extends AnnexeDTO {

    private String numCredit;

    private Date dateEcheance;

    private String montantDemande;

    public String getNumCredit() {
        return numCredit;
    }

    public void setNumCredit(String numCredit) {
        this.numCredit = numCredit;
    }

    public Date getDateEcheance() {
        return dateEcheance;
    }

    public void setDateEcheance(Date dateEcheance) {
        this.dateEcheance = dateEcheance;
    }

    public String getMontantDemande() {
        return montantDemande;
    }

    public void setMontantDemande(String montantDemande) {
        this.montantDemande = montantDemande;
    }
}
