package net.nak.services;

import net.nak.DTO.UtilisateurDTO;
import net.nak.entities.Utilisateur;
import net.nak.enums.Role;

import java.util.List;

public interface UtilisateurService {
    UtilisateurDTO ajouterUtilisateur(UtilisateurDTO utilisateurDTO);

    UtilisateurDTO modifierUtilisateur(Long id, UtilisateurDTO updatedUtilisateurDTO);

    void supprimerUtilisateur(Long id);

    List<UtilisateurDTO> getAllUtilisateurs();

    UtilisateurDTO getUtilisateurById(Long id);
    List<UtilisateurDTO> getUtilisateursByRole(Role role);

}
