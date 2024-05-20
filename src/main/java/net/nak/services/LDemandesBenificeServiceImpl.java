package net.nak.services;

import net.nak.DTO.ListeDemandesBenificeDTO;
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

    public LDemandesBenificeServiceImpl(LDemandesBenificeRepository listeDemandesBenificeRepository ) {
        this.listeDemandesBenificeRepository = listeDemandesBenificeRepository;
        this.modelMapper = new ModelMapper();    }

    @Override
    public ListeDemandesBenificeDTO addlisteDemandesBenifice(ListeDemandesBenificeDTO listeDemandesBenificeDTO) {
        ListeDemandesBenifice listeDemandesBenifice = modelMapper.map(listeDemandesBenificeDTO, ListeDemandesBenifice.class);
        ListeDemandesBenifice savedListeDemandesBenifice = listeDemandesBenificeRepository.save(listeDemandesBenifice);
        return modelMapper.map(savedListeDemandesBenifice, ListeDemandesBenificeDTO.class);
    }

    @Override
    public ListeDemandesBenificeDTO updatelisteDemandesBenifice(Long id, ListeDemandesBenificeDTO listeDemandesBenificeDTO) {
        ListeDemandesBenifice existingListeDemandesBenifice = listeDemandesBenificeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Liste Demandes Benifice not found with id: " + id));
        modelMapper.map(listeDemandesBenificeDTO, existingListeDemandesBenifice);
        ListeDemandesBenifice updatedListeDemandesBenifice = listeDemandesBenificeRepository.save(existingListeDemandesBenifice);
        return modelMapper.map(updatedListeDemandesBenifice, ListeDemandesBenificeDTO.class);
    }

    @Override
    public void deletelisteDemandesBenifice(Long id) {
        listeDemandesBenificeRepository.deleteById(id);
    }

    @Override
    public ListeDemandesBenificeDTO getlisteDemandesBenificeById(Long id) {
        ListeDemandesBenifice listeDemandesBenifice = listeDemandesBenificeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Liste Demandes Benifice not found with id: " + id));
        return modelMapper.map(listeDemandesBenifice, ListeDemandesBenificeDTO.class);
    }

    @Override
    public List<ListeDemandesBenificeDTO> getAlllisteDemandesBenifice() {
        List<ListeDemandesBenifice> allListeDemandesBenifice = listeDemandesBenificeRepository.findAll();
        return allListeDemandesBenifice.stream()
                .map(listeDemandesBenifice -> modelMapper.map(listeDemandesBenifice, ListeDemandesBenificeDTO.class))
                .collect(Collectors.toList());
    }
}
