package net.nak.DTO;

import net.nak.entities.Annexe;
import net.nak.entities.ProduitEntreprise;

import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.Date;
import java.util.List;

public class TAMDTO extends AnnexeDTO {

    private String numCIN;
    private String numCredit;
    private Date dateEcheance;
    private Double principal;
    private Double encours;
    private Double interetsHT;
    private Double tva;
    private Double interetTTC;
    private Double totalEcheanceTTC;
    private Double ristourneTTC;

    private List<ProduitEntreprise> produitEntreprise;


    public String getNumCIN() {
        return numCIN;
    }

    public void setNumCIN(String numCIN) {
        this.numCIN = numCIN;
    }

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

    public Double getPrincipal() {
        return principal;
    }

    public void setPrincipal(Double principal) {
        this.principal = principal;
    }

    public Double getEncours() {
        return encours;
    }

    public void setEncours(Double encours) {
        this.encours = encours;
    }

    public Double getInteretsHT() {
        return interetsHT;
    }

    public void setInteretsHT(Double interetsHT) {
        this.interetsHT = interetsHT;
    }

    public Double getTva() {
        return tva;
    }

    public void setTva(Double tva) {
        this.tva = tva;
    }

    public Double getInteretTTC() {
        return interetTTC;
    }

    public void setInteretTTC(Double interetTTC) {
        this.interetTTC = interetTTC;
    }

    public Double getTotalEcheanceTTC() {
        return totalEcheanceTTC;
    }

    public void setTotalEcheanceTTC(Double totalEcheanceTTC) {
        this.totalEcheanceTTC = totalEcheanceTTC;
    }

    public Double getRistourneTTC() {
        return ristourneTTC;
    }

    public void setRistourneTTC(Double ristourneTTC) {
        this.ristourneTTC = ristourneTTC;
    }

    public List<ProduitEntreprise> getProduitEntreprise() {
        return produitEntreprise;
    }

    public void setProduitEntreprise(List<ProduitEntreprise> produitEntreprise) {
        this.produitEntreprise = produitEntreprise;
    }
}
