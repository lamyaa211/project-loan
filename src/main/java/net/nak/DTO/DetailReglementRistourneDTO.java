package net.nak.DTO;

import net.nak.entities.Annexe;
import net.nak.entities.ProduitEntreprise;

import java.util.Date;
import java.util.List;

public class DetailReglementRistourneDTO extends AnnexeDTO {
    private String idCredit;
    private Date dateEcheance;
    private Double montantRistoune;
    private Date dateReglement;
    private String refReglement;

    private List<ProduitEntreprise> produitEntreprise;


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

    public void setMontantRistoune(Double montantRistoune) {
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

    public List<ProduitEntreprise> getProduitEntreprise() {
        return produitEntreprise;
    }

    public void setProduitEntreprise(List<ProduitEntreprise> produitEntreprise) {
        this.produitEntreprise = produitEntreprise;
    }
}
