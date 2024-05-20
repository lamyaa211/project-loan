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

    @Column(name = "num_cin")
    private String numCIN;

    @Column(name = "date_situation")
    private Date dateSituation;

    @Column(name = "code_assignation_pay")
    private CodeAssignationPay codeAssignationPay;

    @Column(name = "ref_assignation_pay")
    private Integer refAssignationPay;

    @Column(name = "code_realisation_hyp")
    private CodeRealisationHypotheque codeRealisationHyp;

    @Column(name = "ref_realisation_hyp")
    private Integer refRealisationHyp;

    @Column(name = "consolidation")
    private Boolean consolidation;

    @Column(name = "date_recouvrement")
    private Date dateRecouvrement;
}
