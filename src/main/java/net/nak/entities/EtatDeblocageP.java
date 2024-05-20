package net.nak.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@AllArgsConstructor @NoArgsConstructor @Getter @Setter
@Table(name="EtatDeblocageP")
public class EtatDeblocageP extends EtatDeblocageCredit{

    @Column(name = "num_cin")
    private String numCIN;

    @Column(name = "num_deblocage")
    private String numDebl;

}
