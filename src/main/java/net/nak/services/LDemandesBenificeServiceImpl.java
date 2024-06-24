package net.nak.services;

import net.nak.DTO.ListeDemandesBeneficeDTO;
import net.nak.entities.ListeDemandesBenifice;
import net.nak.repositories.LDemandesBenificeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LDemandesBenificeServiceImpl implements LDemandesBenificeService {

    private final LDemandesBenificeRepository listeDemandesBenificeRepository;
    private final ModelMapper modelMapper;

    public LDemandesBenificeServiceImpl(LDemandesBenificeRepository listeDemandesBenificeRepository, ModelMapper modelMapper) {
        this.listeDemandesBenificeRepository = listeDemandesBenificeRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ListeDemandesBeneficeDTO addlisteDemandesBenifice(ListeDemandesBeneficeDTO listeDemandesBenificeDTO) {
        ListeDemandesBenifice listeDemandesBenifice = modelMapper.map(listeDemandesBenificeDTO, ListeDemandesBenifice.class);
        ListeDemandesBenifice savedListeDemandesBenifice = listeDemandesBenificeRepository.save(listeDemandesBenifice);
        return modelMapper.map(savedListeDemandesBenifice, ListeDemandesBeneficeDTO.class);
    }

    @Override
    public ListeDemandesBeneficeDTO updatelisteDemandesBenifice(Long id, ListeDemandesBeneficeDTO listeDemandesBenificeDTO) {
        ListeDemandesBenifice existingListeDemandesBenifice = listeDemandesBenificeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Liste Demandes Benifice not found with id: " + id));
        modelMapper.map(listeDemandesBenificeDTO, existingListeDemandesBenifice);
        ListeDemandesBenifice updatedListeDemandesBenifice = listeDemandesBenificeRepository.save(existingListeDemandesBenifice);
        return modelMapper.map(updatedListeDemandesBenifice, ListeDemandesBeneficeDTO.class);
    }

    @Override
    public void deletelisteDemandesBenifice(Long id) {
        listeDemandesBenificeRepository.deleteById(id);
    }

    @Override
    public ListeDemandesBeneficeDTO getlisteDemandesBenificeById(Long id) {
        ListeDemandesBenifice listeDemandesBenifice = listeDemandesBenificeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Liste Demandes Benifice not found with id: " + id));
        return modelMapper.map(listeDemandesBenifice, ListeDemandesBeneficeDTO.class);
    }

    @Override
    public List<ListeDemandesBeneficeDTO> getAlllisteDemandesBenifice() {
        List<ListeDemandesBenifice> allListeDemandesBenifice = listeDemandesBenificeRepository.findAll();
        return allListeDemandesBenifice.stream()
                .map(listeDemandesBenifice -> modelMapper.map(listeDemandesBenifice, ListeDemandesBeneficeDTO.class))
                .collect(Collectors.toList());
    }
}
