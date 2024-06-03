package net.nak.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@AllArgsConstructor @NoArgsConstructor @Getter @Setter
@Table(name="EtatDeblocageE")
public class EtatDeblocageE extends EtatDeblocageCredit{

    @Column(name = "dernier_deblocage")
    private Double dernierDebl;

    @OneToMany
    private List<ProduitEntreprise> produitEntreprise;

}