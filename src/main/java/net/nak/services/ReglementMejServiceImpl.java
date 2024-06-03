package net.nak.services;

import net.nak.DTO.ReglementMejDTO;
import net.nak.entities.ReglementMEJ;
import net.nak.repositories.ReglementMejRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReglementMejServiceImpl implements ReglementMejService {

    private final ReglementMejRepository reglementMejRepository;
    private final ModelMapper modelMapper;

    public ReglementMejServiceImpl(ReglementMejRepository reglementMejRepository, ModelMapper modelMapper) {
        this.reglementMejRepository = reglementMejRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ReglementMejDTO addReglementMej(ReglementMejDTO reglementMejDTO) {
        ReglementMEJ reglementMej = modelMapper.map(reglementMejDTO, ReglementMEJ.class);
        ReglementMEJ savedReglementMej = reglementMejRepository.save(reglementMej);
        return modelMapper.map(savedReglementMej, ReglementMejDTO.class);
    }

    @Override
    public ReglementMejDTO updateReglementMej(Long id, ReglementMejDTO reglementMejDTO) {
        ReglementMEJ existingReglementMej = reglementMejRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("ReglementMej not found with id: " + id));
        modelMapper.map(reglementMejDTO, existingReglementMej);
        ReglementMEJ updatedReglementMej = reglementMejRepository.save(existingReglementMej);
        return modelMapper.map(updatedReglementMej, ReglementMejDTO.class);
    }

    @Override
    public void deleteReglementMej(Long id) {
        reglementMejRepository.deleteById(id);
    }

    @Override
    public ReglementMejDTO getReglementMejById(Long id) {
        ReglementMEJ reglementMej = reglementMejRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("ReglementMej not found with id: " + id));
        return modelMapper.map(reglementMej, ReglementMejDTO.class);
    }

    @Override
    public List<ReglementMejDTO> getAllReglementMej() {
        List<ReglementMEJ> allReglementMej = reglementMejRepository.findAll();
        return allReglementMej.stream()
                .map(reglementMej -> modelMapper.map(reglementMej, ReglementMejDTO.class))
                .collect(Collectors.toList());
    }
}
