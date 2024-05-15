package net.nak.entities;

import lombok.*;
import javax.persistence.*;

@MappedSuperclass
@AllArgsConstructor @NoArgsConstructor
@Getter @Setter @Builder
public class Annexe {

    private String codebq;

    private String codeproduit;

    private String nbreligne;

    private String numero;


    private String lamyaa ;

}
