package net.nak.entities;

import javax.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor @NoArgsConstructor
@Getter @Setter
@Table(name="Annexe")
public class Annexe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "annexe_id")
    private Long id;

    @Column(name = "code_bq")
    private String codeBq;

    @ManyToOne
    @JoinColumn(name = "code_produit")
    private Produit produit;

    @Column(name = "nbre_ligne")
    private String nbreLigne;

    @Column(name = "numero_annexe")
    private String numeroAnnexe;
}
