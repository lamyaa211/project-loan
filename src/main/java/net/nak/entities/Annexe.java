package net.nak.entities;


import lombok.*;
import javax.persistence.*;

@Entity
@AllArgsConstructor @NoArgsConstructor
@Getter @Setter @Builder
public class Annexe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codebq;

    private String codeproduit;

    private String nbreligne;

    private String numero;


}
