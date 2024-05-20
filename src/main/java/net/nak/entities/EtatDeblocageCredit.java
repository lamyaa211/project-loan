package net.nak.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

@Entity
@AllArgsConstructor @NoArgsConstructor @Getter @Setter
@Table(name="EtatDeblocageCredit")
public class EtatDeblocageCredit extends Annexe{

    @Column(name = "num_credit")
    private String numCredit;

    @Column(name = "date_deblocage")
    private Date dateDebl;

    @Column(name = "montant_deblocage")
    private Double montantDebl;
}
