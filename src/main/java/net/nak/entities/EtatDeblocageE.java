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
@Table(name="EtatDeblocageE")
public class EtatDeblocageE extends EtatDeblocageCredit{

    @Column(name = "dernier_deblocage")
    private Double dernierDebl;

}