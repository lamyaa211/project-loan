package net.nak.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@AllArgsConstructor @NoArgsConstructor @Getter
@Setter
@Table(name="TAM")
public class TAM extends Annexe {

    @Column(name = "num_cin")
    private String numCIN;

    @Column(name = "num_credit")
    private String numCredit;

    @Column(name = "date_echeance")
    private Date dateEcheance;

    @Column(name = "principal")
    private Double principal;

    @Column(name = "encours")
    private Double encours;

    @Column(name = "interetsHT")
    private Double interetsHT;

    @Column(name = "tva")
    private Double tva;

    @Column(name = "interetTTC")
    private Double interetTTC;

    @Column(name = "totalEcheanceTTC")
    private Double totalEcheanceTTC;

    @Column(name = "ristourneTTC")
    private Double ristourneTTC;

    @OneToMany
    private List<ProduitEntreprise> produitEntreprise;
}
