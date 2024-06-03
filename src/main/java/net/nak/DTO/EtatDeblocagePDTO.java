package net.nak.DTO;


import net.nak.entities.ProduitParticulier;

import java.util.List;

public class EtatDeblocagePDTO extends EtatDeblocageCreditDTO {

    private String numCIN;
    private String numDebl;
    private List<ProduitParticulier> produitParticulier;


    public String getNumCIN() {
        return numCIN;
    }

    public void setNumCIN(String numCIN) {
        this.numCIN = numCIN;
    }

    public String getNumDebl() {
        return numDebl;
    }

    public void setNumDebl(String numDebl) {
        this.numDebl = numDebl;
    }

    public List<ProduitParticulier> getProduitParticulier() {
        return produitParticulier;
    }

    public void setProduitParticulier(List<ProduitParticulier> produitParticulier) {
        this.produitParticulier = produitParticulier;
    }
}
