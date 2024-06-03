package net.nak.DTO;


import net.nak.entities.ProduitEntreprise;

import java.util.List;

public class EtatDeblocageEDTO extends EtatDeblocageCreditDTO {

    private Double dernierDebl;
    private List<ProduitEntreprise> produitEntreprise;


    public Double getDernierDebl() {
        return dernierDebl;
    }

    public void setDernierDebl(Double dernierDebl) {
        this.dernierDebl = dernierDebl;
    }

    public List<ProduitEntreprise> getProduitEntreprise() {
        return produitEntreprise;
    }

    public void setProduitEntreprise(List<ProduitEntreprise> produitEntreprise) {
        this.produitEntreprise = produitEntreprise;
    }
}
