package net.nak.entities;

import javax.persistence.*;

import lombok.*;

import java.util.List;

@Entity
@AllArgsConstructor @NoArgsConstructor
@Getter @Setter
@Table(name="ProduitParticulier")
public class ProduitParticulier extends Produit{

    @ManyToOne
    private AnnulationTAM annulationTAM;

    @ManyToOne
    private ChangementDebiteur changementDebiteur;

    @ManyToOne
    private EtatEvenementsAvantCredit etatEvenementsAvantCredit;

    @ManyToOne
    private ListeDemandesBenifice listeDemandesBenifice;

    @ManyToOne
    private EtatDeblocageP etatDeblocageP;

    @ManyToOne
    private SuiviActionRecouvrementP suiviActionRecouvrementP;

    @ManyToOne
    private DemandeIndemnisationP demandeIndemnisationP;


}
