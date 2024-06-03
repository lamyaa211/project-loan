package net.nak.DTO;

import net.nak.entities.Annexe;
import net.nak.entities.ProduitEntreprise;

import java.util.Date;
import java.util.List;

public class ReglementMejDTO extends AnnexeDTO {
    private String idCredit;
    private Double montantMEJ;
    private Date dateReglement;
    private String refReglement;
    private List<ProduitEntreprise> produitEntreprise;



    public String getIdCredit() {
        return idCredit;
    }

    public void setIdCredit(String idCredit) {
        this.idCredit = idCredit;
    }

    public Double getMontantMEJ() {
        return montantMEJ;
    }

    public void setMontantMEJ(Double montantMEJ) {
        this.montantMEJ = montantMEJ;
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
