package net.nak.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@AllArgsConstructor @NoArgsConstructor @Getter @Setter
@Table(name="DetailReglementRistourne")
public class DetailReglementRistourne extends Annexe{

    @Column(name = "id_credit")
    private String idCredit;

    @Column(name = "date_echeance")
    private Date dateEcheance;

    @Column(name = "montant_ristoune")
    private Double montantRistoune;

    @Column(name = "date_reglement")
    private Date dateReglement;

    @Column(name = "ref_reglement")
    private String refReglement;

    @OneToMany
    private List<ProduitEntreprise> produitEntreprise;
}

