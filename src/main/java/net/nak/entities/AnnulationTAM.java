package net.nak.entities;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@AllArgsConstructor @NoArgsConstructor
@Getter @Setter
@Table(name="AnnulationTAM")
public class AnnulationTAM extends Annexe{

    @Column(name = "num_cin")
    private String numCIN;

    @Column(name = "num_credit")
    private String numCredit;

    @OneToMany
    private List<ProduitParticulier> produitParticulier;


}
