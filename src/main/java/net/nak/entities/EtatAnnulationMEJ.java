package net.nak.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.nak.enums.CodeMotif;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@AllArgsConstructor @NoArgsConstructor @Getter @Setter
@Table(name="EtatAnnulationMEJ")
public class EtatAnnulationMEJ extends Annexe{

    @Column(name = "id_credit")
    private String idCredit;

    @Column(name = "code_motif")
    private CodeMotif codeMotif;

}
