package net.nak.DTO;

import lombok.Data;
import net.nak.entities.*;

@Data
public class ProduitParticulierDTO  extends ProduitDTO{

    private AnnulationTAM annulationTAM;
    private ChangementDebiteur changementDebiteur;
    private EtatDeblocageP etatDeblocageP;
    private SuiviActionRecouvrementP suiviActionRecouvrementP;
    private EtatEvenementsAvantCredit etatEvenementsAvantCredit;
    private ListeDemandesBenifice listeDemandesBenifice;

}
