package net.nak.DTO;

import lombok.Data;
import lombok.Getter;
import net.nak.entities.*;


@Getter
public class ProduitParticulierDTO  extends ProduitDTO{

    private AnnulationTAM annulationTAM;
    private ChangementDebiteur changementDebiteur;
    private EtatDeblocageP etatDeblocageP;
    private SuiviActionRecouvrementP suiviActionRecouvrementP;
    private EtatEvenementsAvantCredit etatEvenementsAvantCredit;
    private ListeDemandesBenifice listeDemandesBenifice;

    public void setAnnulationTAM(AnnulationTAM annulationTAM) {
        this.annulationTAM = annulationTAM;
    }

    public void setChangementDebiteur(ChangementDebiteur changementDebiteur) {
        this.changementDebiteur = changementDebiteur;
    }

    public void setEtatDeblocageP(EtatDeblocageP etatDeblocageP) {
        this.etatDeblocageP = etatDeblocageP;
    }

    public void setSuiviActionRecouvrementP(SuiviActionRecouvrementP suiviActionRecouvrementP) {
        this.suiviActionRecouvrementP = suiviActionRecouvrementP;
    }

    public void setEtatEvenementsAvantCredit(EtatEvenementsAvantCredit etatEvenementsAvantCredit) {
        this.etatEvenementsAvantCredit = etatEvenementsAvantCredit;
    }

    public void setListeDemandesBenifice(ListeDemandesBenifice listeDemandesBenifice) {
        this.listeDemandesBenifice = listeDemandesBenifice;
    }
}
