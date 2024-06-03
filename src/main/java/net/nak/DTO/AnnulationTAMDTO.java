package net.nak.DTO;

import net.nak.entities.ProduitEntreprise;
import net.nak.entities.ProduitParticulier;

import java.util.List;

public class AnnulationTAMDTO extends AnnexeDTO {
        private String numCIN;
        private String numCredit;
    private List<ProduitParticulier> produitParticulier;



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

    public List<ProduitParticulier> getProduitParticulier() {
        return produitParticulier;
    }

    public void setProduitParticulier(List<ProduitParticulier> produitParticulier) {
        this.produitParticulier = produitParticulier;
    }
}

