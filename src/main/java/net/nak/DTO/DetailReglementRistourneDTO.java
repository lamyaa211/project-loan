package net.nak.DTO;

import net.nak.entities.Annexe;
import java.util.Date;

public class DetailReglementRistourneDTO extends AnnexeDTO {
    private String idCredit;
    private Date dateEcheance;
    private double montantRistoune;
    private Date dateReglement;
    private String refReglement;

    public String getIdCredit() {
        return idCredit;
    }

    public void setIdCredit(String idCredit) {
        this.idCredit = idCredit;
    }

    public Date getDateEcheance() {
        return dateEcheance;
    }

    public void setDateEcheance(Date dateEcheance) {
        this.dateEcheance = dateEcheance;
    }

    public double getMontantRistoune() {
        return montantRistoune;
    }

    public void setMontantRistoune(double montantRistoune) {
        this.montantRistoune = montantRistoune;
    }

    public Date getDateReglement() {
        return dateReglement;
    }

    public void setDateReglement(Date dateReglement) {
        this.dateReglement = dateReglement;
    }

    public String getRefReglement() {
        return refReglement;
    }

    public void setRefReglement(String refReglement) {
        this.refReglement = refReglement;
    }
}
