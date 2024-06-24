package net.nak.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@Entity
@AllArgsConstructor @NoArgsConstructor
@Getter @Setter
@Table(name="DemandeIndemnisationP")
public class DemandeIndemnisationP extends DemandeIndemnisation{

    @Column(name = "num_cin")
    private String numCIN;

    @OneToMany
    private List<ProduitParticulier> produitParticulier;

}
