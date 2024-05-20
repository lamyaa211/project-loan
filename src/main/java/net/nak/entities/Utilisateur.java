package net.nak.entities;

import javax.persistence.*;
import lombok.*;
import net.nak.enums.Role;

@Entity
@AllArgsConstructor @NoArgsConstructor @Getter @Setter
@Table(name="Utilisateur")
public class Utilisateur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "utilisateur_id")
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;


}
