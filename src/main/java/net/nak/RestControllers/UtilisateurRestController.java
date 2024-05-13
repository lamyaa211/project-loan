package net.nak.RestControllers;

import net.nak.DTO.UtilisateurDTO;
import net.nak.enums.Role;
import net.nak.services.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UtilisateurRestController {

    @Autowired
    private UtilisateurService utilisateurService;

    @PostMapping("/addUser")
    public UtilisateurDTO addUser(@RequestBody UtilisateurDTO utilisateurDTO) {
        return utilisateurService.ajouterUtilisateur(utilisateurDTO);
    }

    @PutMapping("/updateUser/{id}")
    public UtilisateurDTO updateUser(@PathVariable Long id, @RequestBody UtilisateurDTO updatedUtilisateurDTO) {
        return utilisateurService.modifierUtilisateur(id, updatedUtilisateurDTO);
    }

    @DeleteMapping("/deleteUser/{id}")
    public void deleteUser(@PathVariable Long id) {
        utilisateurService.supprimerUtilisateur(id);
    }

    @GetMapping("/getAllUsers")
    public List<UtilisateurDTO> getAllUsers() {
        return utilisateurService.getAllUtilisateurs();
    }

    @GetMapping("/getUserById/{id}")
    public UtilisateurDTO getUserById(@PathVariable Long id) {
        return utilisateurService.getUtilisateurById(id);
    }

    @GetMapping("/getUsersByRole/{role}")
    public List<UtilisateurDTO> getUsersByRole(@PathVariable Role role) {
        return utilisateurService.getUtilisateursByRole(role);
    }

}


