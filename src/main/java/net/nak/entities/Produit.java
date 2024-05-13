package net.nak.entities;

import javax.persistence.*;
import lombok.*;
import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor @Getter @Setter
public abstract class Produit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Float codeproduit;
    private String nom;
    private Date date;

}