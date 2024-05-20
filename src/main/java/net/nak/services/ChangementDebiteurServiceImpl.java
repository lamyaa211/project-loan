package net.nak.services;

import net.nak.DTO.ChangementDebiteurDTO;
import net.nak.entities.ChangementDebiteur;
import net.nak.repositories.ChangementDebiteurRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChangementDebiteurServiceImpl implements ChangementDebiteurService {
    private final ChangementDebiteurRepository changementDebiteurRepository;
    private final ModelMapper modelMapper;

    public ChangementDebiteurServiceImpl(ChangementDebiteurRepository changementDebiteurRepository ) {
        this.changementDebiteurRepository = changementDebiteurRepository;
        this.modelMapper = new ModelMapper();
    }

    @Override
    public ChangementDebiteurDTO addChangementDebiteur(ChangementDebiteurDTO changementDebiteurDTO) {
        ChangementDebiteur changementDebiteur = modelMapper.map(changementDebiteurDTO, ChangementDebiteur.class);
        ChangementDebiteur savedChangementDebiteur = changementDebiteurRepository.save(changementDebiteur);
        return modelMapper.map(savedChangementDebiteur, ChangementDebiteurDTO.class);
    }

    @Override
    public ChangementDebiteurDTO updateChangementDebiteur(Long id, ChangementDebiteurDTO changementDebiteurDTO) {
        ChangementDebiteur existingChangementDebiteur = changementDebiteurRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("ChangementDebiteur not found with id: " + id));
        modelMapper.map(changementDebiteurDTO, existingChangementDebiteur);
        ChangementDebiteur updatedChangementDebiteur = changementDebiteurRepository.save(existingChangementDebiteur);
        return modelMapper.map(updatedChangementDebiteur, ChangementDebiteurDTO.class);
    }

    @Override
    public void deleteChangementDebiteur(Long id) {
        changementDebiteurRepository.deleteById(id);
    }

    @Override
    public ChangementDebiteurDTO getChangementDebiteurById(Long id) {
        ChangementDebiteur changementDebiteur = changementDebiteurRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("ChangementDebiteur not found with id: " + id));
        return modelMapper.map(changementDebiteur, ChangementDebiteurDTO.class);
    }

    @Override
    public List<ChangementDebiteurDTO> getAllChangementDebiteur() {
        List<ChangementDebiteur> allChangementDebiteur = changementDebiteurRepository.findAll();
        return allChangementDebiteur.stream()
                .map(changementDebiteur -> modelMapper.map(changementDebiteur, ChangementDebiteurDTO.class))
                .collect(Collectors.toList());
    }
}
