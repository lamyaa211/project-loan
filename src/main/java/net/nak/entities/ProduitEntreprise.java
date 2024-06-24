package net.nak.entities;

import javax.persistence.*;

import lombok.*;

import java.util.List;

@Entity
@AllArgsConstructor @NoArgsConstructor
@Getter @Setter
@Table(name="ProduitEntreprise")
public class ProduitEntreprise extends Produit {

    @ManyToOne
    private TAM tam;

    @ManyToOne
    private EtatDeblocageE etatDeblocageE;

    @ManyToOne
    private DetailReglementRistourne detailReglementRistourne;

    @ManyToOne
    private SuiviActionRecouvrementE suiviActionRecouvrementE;

    @ManyToOne
    private EtatAnnulationMEJ etatAnnulationMEJ;

    @ManyToOne
    private ReglementMEJ reglementMEJ;

    @ManyToOne
    private DemandeIndemnisationE demandeIndemnisationE;
}
