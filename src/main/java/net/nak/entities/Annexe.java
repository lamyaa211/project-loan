package net.nak.entities;

import lombok.*;
import javax.persistence.*;

@MappedSuperclass
@AllArgsConstructor @NoArgsConstructor
@Getter @Setter @Builder
public class Annexe {

    // Vous pouvez supprimer l'annotation @Id et @GeneratedValue
    // private Long id;

    private String codebq;

    private String codeproduit;

    private String nbreligne;

    private String numero;

    // Si besoin, vous pouvez ajouter des méthodes ou des attributs communs à toutes les classes enfants ici

}
