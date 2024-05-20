package net.nak.entities;

import lombok.*;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@AllArgsConstructor @NoArgsConstructor
@Getter @Setter
@Table(name="AnnulationTAM")
public class AnnulationTAM extends Annexe{

    @Column(name = "num_cin")
    private String numCIN;

    @Column(name = "num_credit")
    private String numCredit;
}
