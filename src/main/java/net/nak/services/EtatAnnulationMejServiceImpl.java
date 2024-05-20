package net.nak.services;

import net.nak.DTO.EtatAnnulationMejDTO;
import net.nak.entities.EtatAnnulationMEJ;
import net.nak.repositories.EtatAnnulationMejRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EtatAnnulationMejServiceImpl implements EtatAnnulationMejService {

    private final EtatAnnulationMejRepository etatAnnulationMejRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public EtatAnnulationMejServiceImpl(EtatAnnulationMejRepository etatAnnulationMejRepository ) {
        this.etatAnnulationMejRepository = etatAnnulationMejRepository;
        this.modelMapper = new ModelMapper();
    }

    @Override
    public EtatAnnulationMejDTO addEtatAnnulationMej(EtatAnnulationMejDTO etatAnnulationMejDTO) {
        EtatAnnulationMEJ etatAnnulationMej = modelMapper.map(etatAnnulationMejDTO, EtatAnnulationMEJ.class);
        EtatAnnulationMEJ savedEtatAnnulationMej = etatAnnulationMejRepository.save(etatAnnulationMej);
        return modelMapper.map(savedEtatAnnulationMej, EtatAnnulationMejDTO.class);
    }

    @Override
    public EtatAnnulationMejDTO updateEtatAnnulationMej(Long id, EtatAnnulationMejDTO etatAnnulationMejDTO) {
        EtatAnnulationMEJ existingEtatAnnulationMej = etatAnnulationMejRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Etat Annulation MEJ not found with id: " + id));
        modelMapper.map(etatAnnulationMejDTO, existingEtatAnnulationMej);
        EtatAnnulationMEJ updatedEtatAnnulationMej = etatAnnulationMejRepository.save(existingEtatAnnulationMej);
        return modelMapper.map(updatedEtatAnnulationMej, EtatAnnulationMejDTO.class);
    }

    @Override
    public void deleteEtatAnnulationMej(Long id) {
        etatAnnulationMejRepository.deleteById(id);
    }

    @Override
    public EtatAnnulationMejDTO getEtatAnnulationMejById(Long id) {
        EtatAnnulationMEJ etatAnnulationMej = etatAnnulationMejRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Etat Annulation MEJ not found with id: " + id));
        return modelMapper.map(etatAnnulationMej, EtatAnnulationMejDTO.class);
    }

    @Override
    public List<EtatAnnulationMejDTO> getAllEtatAnnulationMej() {
        List<EtatAnnulationMEJ> allEtatAnnulationMej = etatAnnulationMejRepository.findAll();
        return allEtatAnnulationMej.stream()
                .map(etatAnnulationMej -> modelMapper.map(etatAnnulationMej, EtatAnnulationMejDTO.class))
                .collect(Collectors.toList());
    }
}
