package net.nak.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.nak.enums.Debiteur;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@AllArgsConstructor @NoArgsConstructor @Getter @Setter
@Table(name="ChangementDebiteur")
public class ChangementDebiteur extends Annexe{

    @Column(name = "num_credit")
    private String numcredit;

    @Column(name = "num_cin")
    private String numCIN;

    @Column(name = "debiteur_initial")
    private Debiteur debiteurInit;

    @Column(name = "nouveau_debiteur")
    private Debiteur nouveauDebit;

    @Column(name = "date_effet_transfert")
    private Date dateEffetTransfert;

    @OneToMany
    private List<ProduitParticulier> produitParticulier;

}