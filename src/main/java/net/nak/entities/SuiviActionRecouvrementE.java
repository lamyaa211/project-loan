package net.nak.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.nak.enums.TypeAction;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@AllArgsConstructor @NoArgsConstructor @Getter @Setter
@Table(name="SuiviActionRecouvrementEntrp")
public class SuiviActionRecouvrementE extends SuiviActionRecouvrement{

    @Column(name = "type_action")
    private TypeAction typeAction;

    @Column(name = "code_type_surete")
    private String codeTypeSurete;

    @Column(name = "id_surete")
    private String idSurete;

    @Column(name = "etat_avancement")
    private String etatAvancement;

    @OneToMany
    private List<ProduitEntreprise> produitEntreprise;
}
