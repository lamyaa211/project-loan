package net.nak.DTO;

import lombok.Data;
import net.nak.entities.*;

@Data
public class ProduitEntrepriseDTO extends ProduitDTO {

    private TAM tam;
    private EtatDeblocageE etatDeblocageE;
    private DetailReglementRistourne detailReglementRistourne;
    private SuiviActionRecouvrementE suiviActionRecouvrementE;
    private EtatAnnulationMEJ etatAnnulationMEJ;
    private ReglementMEJ reglementMEJ;


}