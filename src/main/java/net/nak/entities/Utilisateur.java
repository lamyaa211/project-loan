package net.nak.entities;

import javax.persistence.*;
import lombok.*;
import net.nak.enums.Role;

@Entity
@AllArgsConstructor @NoArgsConstructor @Getter @Setter @Builder
public class Utilisateur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;


}
