package net.nak.DTO;

import lombok.Data;
import lombok.Getter;
import net.nak.entities.*;

@Getter
public class ProduitEntrepriseDTO extends ProduitDTO {

    private TAM tam;
    private EtatDeblocageE etatDeblocageE;
    private DetailReglementRistourne detailReglementRistourne;
    private SuiviActionRecouvrementE suiviActionRecouvrementE;
    private EtatAnnulationMEJ etatAnnulationMEJ;
    private ReglementMEJ reglementMEJ;

    public void setTam(TAM tam) {
        this.tam = tam;
    }

    public void setEtatDeblocageE(EtatDeblocageE etatDeblocageE) {
        this.etatDeblocageE = etatDeblocageE;
    }

    public void setDetailReglementRistourne(DetailReglementRistourne detailReglementRistourne) {
        this.detailReglementRistourne = detailReglementRistourne;
    }

    public void setSuiviActionRecouvrementE(SuiviActionRecouvrementE suiviActionRecouvrementE) {
        this.suiviActionRecouvrementE = suiviActionRecouvrementE;
    }

    public void setEtatAnnulationMEJ(EtatAnnulationMEJ etatAnnulationMEJ) {
        this.etatAnnulationMEJ = etatAnnulationMEJ;
    }

    public void setReglementMEJ(ReglementMEJ reglementMEJ) {
        this.reglementMEJ = reglementMEJ;
    }
}