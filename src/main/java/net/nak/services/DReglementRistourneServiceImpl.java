package net.nak.services;

import net.nak.DTO.DetailReglementRistourneDTO;
import net.nak.entities.DetailReglementRistourne;
import net.nak.repositories.DReglementRistourneRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DReglementRistourneServiceImpl implements DReglementRistourneService {

    private final DReglementRistourneRepository detailReglementRistourneRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public DReglementRistourneServiceImpl(DReglementRistourneRepository detailReglementRistourneRepository ) {
        this.detailReglementRistourneRepository = detailReglementRistourneRepository;
        this.modelMapper = new ModelMapper();
    }

    @Override
    public DetailReglementRistourneDTO addDetailReglementRistourne(DetailReglementRistourneDTO detailReglementRistourneDTO) {
        DetailReglementRistourne detailReglementRistourne = modelMapper.map(detailReglementRistourneDTO, DetailReglementRistourne.class);
        detailReglementRistourne = detailReglementRistourneRepository.save(detailReglementRistourne);
        return modelMapper.map(detailReglementRistourne, DetailReglementRistourneDTO.class);
    }

    @Override
    public DetailReglementRistourneDTO updateDetailReglementRistourne(Long id, DetailReglementRistourneDTO detailReglementRistourneDTO) {
        Optional<DetailReglementRistourne> existingDetailReglementRistourneOpt = detailReglementRistourneRepository.findById(id);
        if (existingDetailReglementRistourneOpt.isPresent()) {
            DetailReglementRistourne existingDetailReglementRistourne = existingDetailReglementRistourneOpt.get();
            modelMapper.map(detailReglementRistourneDTO, existingDetailReglementRistourne);
            existingDetailReglementRistourne = detailReglementRistourneRepository.save(existingDetailReglementRistourne);
            return modelMapper.map(existingDetailReglementRistourne, DetailReglementRistourneDTO.class);
        }
        return null;
    }

    @Override
    public void deleteDetailReglementRistourne(Long id) {
        detailReglementRistourneRepository.deleteById(id);
    }

    @Override
    public DetailReglementRistourneDTO getDetailReglementRistourneById(Long id) {
        Optional<DetailReglementRistourne> optionalDetailReglementRistourne = detailReglementRistourneRepository.findById(id);
        return optionalDetailReglementRistourne.map(detailReglementRistourne -> modelMapper.map(detailReglementRistourne, DetailReglementRistourneDTO.class)).orElse(null);
    }

    @Override
    public List<DetailReglementRistourneDTO> getAllDetailReglementRistourne() {
        List<DetailReglementRistourne> detailReglementRistourneList = detailReglementRistourneRepository.findAll();
        return detailReglementRistourneList.stream()
                .map(detailReglementRistourne -> modelMapper.map(detailReglementRistourne, DetailReglementRistourneDTO.class))
                .collect(Collectors.toList());
    }
}
