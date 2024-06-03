package net.nak.entities;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.nak.enums.CodeEvenement;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@AllArgsConstructor @NoArgsConstructor @Getter @Setter
@Table(name="EtatEvenementsAvantCredit")
public class EtatEvenementsAvantCredit extends Annexe{

    @Column(name = "num_cin")
    private String numCIN;

    @Column(name = "num_credit")
    private String numCredit;

    @Column(name = "code_evenement")
    private CodeEvenement codeEvenement;

    @Column(name = "date_effet")
    private Date dateEffet;

    @OneToMany
    private List<ProduitParticulier> produitParticulier;

}
