package net.nak.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.nak.enums.CodeAssignationPay;
import net.nak.enums.CodeRealisationHypotheque;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

@Entity
@AllArgsConstructor @NoArgsConstructor @Getter @Setter
@Table(name="SuiviActionRecouvrementPart")
public class SuiviActionRecouvrementP extends SuiviActionRecouvrement{

    @Column(name = "id_credit")
    private String numCIN;

    @Column(name = "id_credit")
    private Date dateSituation;

    @Column(name = "id_credit")
    private CodeAssignationPay codeAssignationPay;

    @Column(name = "id_credit")
    private Integer refAssignationPay;

    @Column(name = "id_credit")
    private CodeRealisationHypotheque codeRealisationHyp;

    @Column(name = "id_credit")
    private Integer refRealisationHyp;

    @Column(name = "id_credit")
    private Boolean consolidation;

    @Column(name = "id_credit")
    private Date dateRecouvrement;
}
