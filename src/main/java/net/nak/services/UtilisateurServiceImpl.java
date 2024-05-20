package net.nak.services;

import net.nak.DTO.UtilisateurDTO;
import net.nak.entities.Utilisateur;
import net.nak.enums.Role;
import net.nak.repositories.UtilisateurRepository;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UtilisateurServiceImpl implements UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;


    public UtilisateurServiceImpl(UtilisateurRepository utilisateurRepository, PasswordEncoder passwordEncoder) {
        this.utilisateurRepository = utilisateurRepository;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = new ModelMapper();
    }


    @Override
    public UtilisateurDTO ajouterUtilisateur(UtilisateurDTO utilisateurDTO) {
        Utilisateur utilisateur = modelMapper.map(utilisateurDTO, Utilisateur.class);
        utilisateur = utilisateurRepository.save(utilisateur);
        return modelMapper.map(utilisateur, UtilisateurDTO.class);
    }

        @Override
        public UtilisateurDTO modifierUtilisateur(Long id, UtilisateurDTO updatedUtilisateurDTO) {
            Optional<Utilisateur> optionalUtilisateur = utilisateurRepository.findById(id);
            if (optionalUtilisateur.isPresent()) {
                Utilisateur utilisateur = optionalUtilisateur.get();

                // Vérifier le new passwd est fourni
                if (updatedUtilisateurDTO.getPassword() != null) {
                    // Vérifier l'ancien passwd correspond
                    if (!passwordEncoder.matches(updatedUtilisateurDTO.getOldPassword(), utilisateur.getPassword())) {
                        throw new RuntimeException("Ancien mot de passe incorrect");
                    }
                    // Mettre à jour le nouveau
                    utilisateur.setPassword(passwordEncoder.encode(updatedUtilisateurDTO.getPassword()));
                }

                modelMapper.map(updatedUtilisateurDTO, utilisateur);

                utilisateur = utilisateurRepository.save(utilisateur);
                return modelMapper.map(utilisateur, UtilisateurDTO.class);
            } else {
                throw new RuntimeException("Utilisateur non trouvé");
            }
        }


    @Override
    public void supprimerUtilisateur(Long id) {
        utilisateurRepository.deleteById(id);
    }

    @Override
    public List<UtilisateurDTO> getAllUtilisateurs() {
        List<Utilisateur> utilisateurs = utilisateurRepository.findAll();
        return utilisateurs.stream().map(utilisateur -> modelMapper.map(utilisateur, UtilisateurDTO.class)).collect(Collectors.toList());
    }

    @Override
    public UtilisateurDTO getUtilisateurById(Long id) {
        Optional<Utilisateur> optionalUtilisateur = utilisateurRepository.findById(id);
        return optionalUtilisateur.map(utilisateur -> modelMapper.map(utilisateur, UtilisateurDTO.class)).orElse(null);
    }

    @Override
    public List<UtilisateurDTO> getUtilisateursByRole(Role role) {
        List<Utilisateur> utilisateurs = utilisateurRepository.findByRole(role);
        return utilisateurs.stream().map(utilisateur -> modelMapper.map(utilisateur, UtilisateurDTO.class)).collect(Collectors.toList());
    }
}
