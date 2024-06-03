package net.nak.services;

import net.nak.DTO.TAMDTO;
import net.nak.entities.TAM;
import net.nak.repositories.TAMRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TAMServiceImpl implements TAMService {
    private final TAMRepository tamRepository;
    private final ModelMapper modelMapper;

    public TAMServiceImpl(TAMRepository tamRepository, ModelMapper modelMapper ) {
        this.tamRepository = tamRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public TAMDTO addTAM(TAMDTO tamDTO) {
        TAM tam = modelMapper.map(tamDTO, TAM.class);
        TAM savedTAM = tamRepository.save(tam);
        return modelMapper.map(savedTAM, TAMDTO.class);
    }

    @Override
    public TAMDTO updatedTAM(Long id, TAMDTO tamDTO) {
        TAM existingTAM = tamRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("TAM not found with id: " + id));
        modelMapper.map(tamDTO, existingTAM);
        TAM updatedTAM = tamRepository.save(existingTAM);
        return modelMapper.map(updatedTAM, TAMDTO.class);
    }

    @Override
    public void deleteTAM(Long id) {
        tamRepository.deleteById(id);
    }

    @Override
    public TAMDTO getTAMById(Long id) {
        TAM tam = tamRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("TAM not found with id: " + id));
        return modelMapper.map(tam, TAMDTO.class);
    }

    @Override
    public List<TAMDTO> getAllTAM() {
        List<TAM> allTAM = tamRepository.findAll();
        return allTAM.stream()
                .map(tam -> modelMapper.map(tam, TAMDTO.class))
                .collect(Collectors.toList());
    }
}

