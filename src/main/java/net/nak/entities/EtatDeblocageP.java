package net.nak.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@AllArgsConstructor @NoArgsConstructor @Getter @Setter
@Table(name="EtatDeblocageP")
public class EtatDeblocageP extends EtatDeblocageCredit{

    @Column(name = "num_cin")
    private String numCIN;

    @Column(name = "num_deblocage")
    private String numDebl;

    @OneToMany
    private List<ProduitParticulier> produitParticulier;

}
