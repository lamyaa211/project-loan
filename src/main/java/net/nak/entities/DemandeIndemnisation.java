package net.nak.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@AllArgsConstructor @NoArgsConstructor
@Getter @Setter
@Table(name="DemandeIndemnisation")
public class DemandeIndemnisation extends Annexe{

    @Column(name = "num_credit")
    private String numCredit;

    @Column(name = "dateEcheance")
    private Date dateEcheance;

    @Column(name = "montantDemande")
    private String montantDemande;


}
