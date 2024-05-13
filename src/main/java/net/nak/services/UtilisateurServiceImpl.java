package net.nak.services;

import net.nak.DTO.UtilisateurDTO;
import net.nak.entities.Utilisateur;
import net.nak.enums.Role;
import net.nak.repositories.UtilisateurRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UtilisateurServiceImpl implements UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;
    private final ModelMapper modelMapper;

    public UtilisateurServiceImpl(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
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
            modelMapper.map(updatedUtilisateurDTO, utilisateur);
            utilisateur = utilisateurRepository.save(utilisateur);
            return modelMapper.map(utilisateur, UtilisateurDTO.class);
        } else {
            return null; // Utilisateur non trouvé
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
