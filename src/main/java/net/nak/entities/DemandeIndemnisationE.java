package net.nak.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.nak.enums.MotifDemande;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Date;
import java.util.List;

@Entity
@AllArgsConstructor @NoArgsConstructor
@Getter @Setter
@Table(name="DemandeIndemnisationE")
public class DemandeIndemnisationE extends DemandeIndemnisation{

    @Column(name = "capital_restant")
    private Double capitalRestant;

    @Column(name = "motif_demande")
    private MotifDemande motifDemande;

    @Column(name = "date_premier_Impaye")
    private Date datePremImpaye;

    @Column(name = "date_declaration_contentieux")
    private Date dateDeclarationContentieux;

    @OneToMany
    private List<ProduitEntreprise> produitEntreprise;
}

