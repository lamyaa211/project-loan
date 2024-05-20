package net.nak.services;

import net.nak.DTO.AnnulationTAMDTO;
import net.nak.entities.AnnulationTAM;
import net.nak.repositories.AnnulationTAMRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AnnulationTAMServiceImpl implements AnnulationTAMService {

        private final AnnulationTAMRepository annulationTamRepository;
        private final ModelMapper modelMapper;

    public AnnulationTAMServiceImpl(AnnulationTAMRepository annulationTamRepository ) {
        this.annulationTamRepository = annulationTamRepository;
        this.modelMapper = new ModelMapper();
    }

        @Override
        public AnnulationTAMDTO addAnnulationTAM(AnnulationTAMDTO annulationTAMDTO) {
            AnnulationTAM annulationTam = modelMapper.map(annulationTAMDTO, AnnulationTAM.class);
            AnnulationTAM savedAnnulationTam = annulationTamRepository.save(annulationTam);
            return modelMapper.map(savedAnnulationTam, AnnulationTAMDTO.class);
        }

        @Override
        public AnnulationTAMDTO updateAnnulationTAM(Long id, AnnulationTAMDTO annulationTAMDTO) {
            AnnulationTAM existingAnnulationTam = annulationTamRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("AnnulationTam not found with id: " + id));
            modelMapper.map(annulationTAMDTO, existingAnnulationTam);
            AnnulationTAM updatedAnnulationTam = annulationTamRepository.save(existingAnnulationTam);
            return modelMapper.map(updatedAnnulationTam, AnnulationTAMDTO.class);
        }

        @Override
        public void deleteAnnulationTAM(Long id) {
            annulationTamRepository.deleteById(id);
        }

        @Override
        public AnnulationTAMDTO getAnnulationTAMById(Long id) {
            AnnulationTAM annulationTAM = annulationTamRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("AnnulationTam not found with id: " + id));
            return modelMapper.map(annulationTAM, AnnulationTAMDTO.class);
        }

        @Override
        public List<AnnulationTAMDTO> getAllAnnulationTAM() {
            List<AnnulationTAM> allAnnulationTAM = annulationTamRepository.findAll();
            return allAnnulationTAM.stream()
                    .map(annulationTAM -> modelMapper.map(annulationTAM, AnnulationTAMDTO.class))
                    .collect(Collectors.toList());
        }

}
