package net.nak.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.nak.enums.Genre;
import net.nak.enums.NatureTF;
import net.nak.enums.ObjetCredit;
import net.nak.enums.TypeCredit;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
@AllArgsConstructor @NoArgsConstructor @Getter @Setter
public class ListeDemandesBenifice extends Annexe{

    @Column(name = "nom")
    private String nom;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "num_cin")
    private String numCIN;

    @Column(name = "genre")
    private Genre genre;

    @Column(name = "montant")
    private Double montant;

    @Column(name = "duree")
    private String duree;

    @Column(name = "quotite_financement")
    private Double quotiteFinancement;

    @Column(name = "objet_credit")
    private ObjetCredit objetCredit;

    @Column(name = "taux_interet")
    private Double tauxInteret;

    @Column(name = "cout_global")
    private Double coutGlobal;

    @Column(name = "prix")
    private Double prix;

    @Column(name = "superficie")
    private Double superficie;

    @Column(name = "code_ville")
    private String codeVille;

    @Column(name = "numTF")
    private String numTF;

    @Column(name = "vender_logement")
    private String venderLogement;

    @Column(name = "acquisition_indivision")
    private Boolean acquisitionIndivision;

    @Column(name = "type_credit")
    private TypeCredit typeCredit;

    @Column(name = "natureTF")
    private NatureTF natureTF;

    @OneToMany
    private List<ProduitParticulier> produitParticulier;
}
