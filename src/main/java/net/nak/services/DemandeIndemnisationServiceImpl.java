package net.nak.services;

import net.nak.DTO.*;
import net.nak.entities.DemandeIndemnisationE;
import net.nak.entities.DemandeIndemnisationP;
import net.nak.entities.SuiviActionRecouvrementE;
import net.nak.entities.SuiviActionRecouvrementP;
import net.nak.repositories.DemandeIndemnisationERepository;
import net.nak.repositories.DemandeIndemnisationPRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DemandeIndemnisationServiceImpl implements DemandeIndemnisationService{

        private final DemandeIndemnisationPRepository demandeIndemnisationPRepository;
        private final DemandeIndemnisationERepository demandeIndemnisationERepository;
        private final ModelMapper modelMapper;

        public DemandeIndemnisationServiceImpl(DemandeIndemnisationPRepository demandeIndemnisationPRepository, DemandeIndemnisationERepository demandeIndemnisationERepository , ModelMapper modelMapper) {
            this.demandeIndemnisationPRepository = demandeIndemnisationPRepository;
            this.demandeIndemnisationERepository = demandeIndemnisationERepository;
            this.modelMapper = modelMapper;
        }

    @Override
    public DemandeIndemnisationPartDTO addDemandeIndemnisationP(DemandeIndemnisationPartDTO demandeIndemnisationPartDTO) {
        DemandeIndemnisationP demandeIndemnisationP = modelMapper.map(demandeIndemnisationPartDTO, DemandeIndemnisationP.class);
        demandeIndemnisationP = demandeIndemnisationPRepository.save(demandeIndemnisationP);
        return modelMapper.map(demandeIndemnisationP, DemandeIndemnisationPartDTO.class);
    }

    @Override
    public DemandeIndemnisationEntrepDTO addDemandeIndemnisationE(DemandeIndemnisationEntrepDTO demandeIndemnisationEntrepDTO) {
        DemandeIndemnisationE demandeIndemnisationE = modelMapper.map(demandeIndemnisationEntrepDTO, DemandeIndemnisationE.class);
        demandeIndemnisationE = demandeIndemnisationERepository.save(demandeIndemnisationE);
        return modelMapper.map(demandeIndemnisationE, DemandeIndemnisationEntrepDTO.class);
    }

    @Override
    public DemandeIndemnisationPartDTO updateDemandeIndemnisationP(Long id, DemandeIndemnisationPartDTO demandeIndemnisationPartDTO) {
        Optional<DemandeIndemnisationP> optionalDemandeIndemnisationP = demandeIndemnisationPRepository.findById(id);
        if (optionalDemandeIndemnisationP.isPresent()) {
            DemandeIndemnisationP demandeIndemnisationP = optionalDemandeIndemnisationP.get();
            modelMapper.map(demandeIndemnisationPartDTO, demandeIndemnisationP);
            demandeIndemnisationP = demandeIndemnisationPRepository.save(demandeIndemnisationP);
            return modelMapper.map(demandeIndemnisationP, DemandeIndemnisationPartDTO.class);
        }
        return null;
    }

    @Override
    public DemandeIndemnisationEntrepDTO updateDemandeIndemnisationE(Long id, DemandeIndemnisationEntrepDTO demandeIndemnisationEntrepDTO) {
        Optional<DemandeIndemnisationE> optionalDemandeIndemnisationE = demandeIndemnisationERepository.findById(id);
        if (optionalDemandeIndemnisationE.isPresent()) {
            DemandeIndemnisationE demandeIndemnisationE = optionalDemandeIndemnisationE.get();
            modelMapper.map(demandeIndemnisationEntrepDTO, demandeIndemnisationE);
            demandeIndemnisationE = demandeIndemnisationERepository.save(demandeIndemnisationE);
            return modelMapper.map(demandeIndemnisationE, DemandeIndemnisationEntrepDTO.class);
        }
        return null;
    }

    @Override
    public void deleteDemandeIndemnisationP(Long id) { demandeIndemnisationPRepository.deleteById(id);}

    @Override
    public void deleteDemandeIndemnisationE(Long id) { demandeIndemnisationERepository.deleteById(id);}


    @Override
    public List<DemandeIndemnisationPartDTO> getAllDemandeIndemnisationP() {
        List<DemandeIndemnisationP> demandeIndemnisationP = demandeIndemnisationPRepository.findAll();
        return demandeIndemnisationP.stream()
                .map(demande -> modelMapper.map(demande, DemandeIndemnisationPartDTO.class))
                .collect(Collectors.toList());
    }
    @Override
    public List<DemandeIndemnisationEntrepDTO> getAllDemandeIndemnisationE() {
        List<DemandeIndemnisationE> demandeIndemnisationE = demandeIndemnisationERepository.findAll();
        return demandeIndemnisationE.stream()
                .map(demande -> modelMapper.map(demande, DemandeIndemnisationEntrepDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<DemandeIndemnisationDTO> getAllDemandeIndemnisation() {
        List<DemandeIndemnisationPartDTO> demandeIndemnisationPartDTO = getAllDemandeIndemnisationP();
        List<DemandeIndemnisationEntrepDTO> demandeIndemnisationEntrepDTO = getAllDemandeIndemnisationE();

        List<DemandeIndemnisationDTO> allDemandeIndemnisation = new ArrayList<>();
        allDemandeIndemnisation.addAll(demandeIndemnisationPartDTO);
        allDemandeIndemnisation.addAll(demandeIndemnisationEntrepDTO);

        return allDemandeIndemnisation;
    }


    @Override
    public Optional<DemandeIndemnisationPartDTO> getDemandeIndemnisationPById(Long id) {
        Optional<DemandeIndemnisationP> optionalDemandeIndemnisationP = demandeIndemnisationPRepository.findById(id);
        return optionalDemandeIndemnisationP.map(demande -> modelMapper.map(demande, DemandeIndemnisationPartDTO.class));
    }


    @Override
    public Optional<DemandeIndemnisationEntrepDTO> getDemandeIndemnisationEById(Long id) {
        Optional<DemandeIndemnisationE> optionalDemandeIndemnisationE = demandeIndemnisationERepository.findById(id);
        return optionalDemandeIndemnisationE.map(demande -> modelMapper.map(demande, DemandeIndemnisationEntrepDTO.class));
    }


}
