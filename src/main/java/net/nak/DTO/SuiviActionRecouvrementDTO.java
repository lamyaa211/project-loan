package net.nak.DTO;

import net.nak.entities.Annexe;

public class SuiviActionRecouvrementDTO extends AnnexeDTO {

    private String numCIN;
    private Double montantFrais;
    private Double montantRecouvRealise;

    public String getNumCIN() {
        return numCIN;
    }

    public void setNumCIN(String numCIN) {
        this.numCIN = numCIN;
    }

    public Double getMontantFrais() {
        return montantFrais;
    }

    public void setMontantFrais(Double montantFrais) {
        this.montantFrais = montantFrais;
    }

    public Double getMontantRecouvRealise() {
        return montantRecouvRealise;
    }

    public void setMontantRecouvRealise(Double montantRecouvRealise) {
        this.montantRecouvRealise = montantRecouvRealise;
    }
}
