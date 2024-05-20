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
@Table(name="SuiviActionRecouvrement")
public class SuiviActionRecouvrement extends Annexe{

    @Column(name = "id_credit")
    private String numCIN;

    @Column(name = "montant_frais")
    private Double montantFrais;

    @Column(name = "montant_recouvRealise")
    private Double montantRecouvRealise;

}
