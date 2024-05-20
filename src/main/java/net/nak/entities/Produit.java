package net.nak.entities;

import javax.persistence.*;
import lombok.*;
import java.util.Date;
import java.util.List;

@Entity
@AllArgsConstructor @NoArgsConstructor
@Getter @Setter
@Table(name="Produit")
public abstract class Produit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "produit_id")
    private Long id;

    @Column(name = "code_produit")
    private String codeProduit;

    @Column(name = "nom_produit")
    private String nom;

    @Column(name = "date_creation")
    private Date date;

}
