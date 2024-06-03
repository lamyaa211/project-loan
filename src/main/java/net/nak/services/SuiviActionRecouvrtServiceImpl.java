package net.nak.services;

import net.nak.DTO.SuiviActionRecouvrementDTO;
import net.nak.DTO.SuiviActionRecouvrementEntrpDTO;
import net.nak.DTO.SuiviActionRecouvrementPartDTO;
import net.nak.entities.SuiviActionRecouvrementE;
import net.nak.entities.SuiviActionRecouvrementP;
import net.nak.repositories.SuiviActionRecouvrementEntrpRepository;
import net.nak.repositories.SuiviActionRecouvrementPartRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SuiviActionRecouvrtServiceImpl implements SuiviActionRecouvrtService {

    private final SuiviActionRecouvrementEntrpRepository suiviActionRecouvrementEntrpRepository;
    private final SuiviActionRecouvrementPartRepository suiviActionRecouvrementPartRepository;
    private final ModelMapper modelMapper;

    public SuiviActionRecouvrtServiceImpl(SuiviActionRecouvrementEntrpRepository suiviActionRecouvrementEntrpRepository, SuiviActionRecouvrementPartRepository suiviActionRecouvrementPartRepository , ModelMapper modelMapper) {
        this.suiviActionRecouvrementEntrpRepository = suiviActionRecouvrementEntrpRepository;
        this.suiviActionRecouvrementPartRepository = suiviActionRecouvrementPartRepository;
        this.modelMapper = modelMapper;
    }


    @Override
    public SuiviActionRecouvrementEntrpDTO addSuiviActionRecouvrtEntreprise(SuiviActionRecouvrementEntrpDTO suiviActionRecouvrementEntrpDTO) {
        SuiviActionRecouvrementE suiviActionRecouvrementEntrp = modelMapper.map(suiviActionRecouvrementEntrpDTO, SuiviActionRecouvrementE.class);
        suiviActionRecouvrementEntrp = suiviActionRecouvrementEntrpRepository.save(suiviActionRecouvrementEntrp);
        return modelMapper.map(suiviActionRecouvrementEntrp, SuiviActionRecouvrementEntrpDTO.class);
    }

    @Override
    public SuiviActionRecouvrementPartDTO addSuiviActionRecouvrtParticulier(SuiviActionRecouvrementPartDTO suiviActionRecouvrementPartDTO) {
        SuiviActionRecouvrementP suiviActionRecouvrementPart = modelMapper.map(suiviActionRecouvrementPartDTO, SuiviActionRecouvrementP.class);
        suiviActionRecouvrementPart = suiviActionRecouvrementPartRepository.save(suiviActionRecouvrementPart);
        return modelMapper.map(suiviActionRecouvrementPart, SuiviActionRecouvrementPartDTO.class);
    }

    @Override
    public SuiviActionRecouvrementEntrpDTO updateSuiviActionRecouvrtEntreprise(Long id, SuiviActionRecouvrementEntrpDTO suiviActionRecouvrementEntrpDTO) {
        Optional<SuiviActionRecouvrementE> optionalSuiviActionRecouvrementEntrp = suiviActionRecouvrementEntrpRepository.findById(id);
        if (optionalSuiviActionRecouvrementEntrp.isPresent()) {
            SuiviActionRecouvrementE suiviActionRecouvrementEntrp = optionalSuiviActionRecouvrementEntrp.get();
            modelMapper.map(suiviActionRecouvrementEntrpDTO, suiviActionRecouvrementEntrp);
            suiviActionRecouvrementEntrp = suiviActionRecouvrementEntrpRepository.save(suiviActionRecouvrementEntrp);
            return modelMapper.map(suiviActionRecouvrementEntrp, SuiviActionRecouvrementEntrpDTO.class);
        }
        return null;
    }

    @Override
    public SuiviActionRecouvrementPartDTO updateSuiviActionRecouvrtParticulier(Long id, SuiviActionRecouvrementPartDTO suiviActionRecouvrementPartDTO) {
        Optional<SuiviActionRecouvrementP> optionalSuiviActionRecouvrementPart = suiviActionRecouvrementPartRepository.findById(id);
        if (optionalSuiviActionRecouvrementPart.isPresent()) {
            SuiviActionRecouvrementP suiviActionRecouvrementPart = optionalSuiviActionRecouvrementPart.get();
            modelMapper.map(suiviActionRecouvrementPartDTO, suiviActionRecouvrementPart);
            suiviActionRecouvrementPart = suiviActionRecouvrementPartRepository.save(suiviActionRecouvrementPart);
            return modelMapper.map(suiviActionRecouvrementPart, SuiviActionRecouvrementPartDTO.class);
        }
        return null;
    }

    @Override
    public void deleteSuiviActionRecouvrtEntreprise(Long id) {suiviActionRecouvrementEntrpRepository.deleteById(id);}

    @Override
    public void deleteSuiviActionRecouvrtParticulier(Long id) {suiviActionRecouvrementPartRepository.deleteById(id);}

    @Override
    public List<SuiviActionRecouvrementEntrpDTO> getAllSuiviActionRecouvrtEntreprise() {
        List<SuiviActionRecouvrementE> suiviActionRecouvrementsEntrp = suiviActionRecouvrementEntrpRepository.findAll();
        return suiviActionRecouvrementsEntrp.stream()
                .map(suiviActionRecouvrementEntrp -> modelMapper.map(suiviActionRecouvrementEntrp, SuiviActionRecouvrementEntrpDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<SuiviActionRecouvrementPartDTO> getAllSuiviActionRecouvrtParticulier() {
        List<SuiviActionRecouvrementP> suiviActionRecouvrementsPart = suiviActionRecouvrementPartRepository.findAll();
        return suiviActionRecouvrementsPart.stream()
                .map(suiviActionRecouvrementPart -> modelMapper.map(suiviActionRecouvrementPart, SuiviActionRecouvrementPartDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<SuiviActionRecouvrementDTO> getAllSuiviActionRecouvrt() {
        List<SuiviActionRecouvrementEntrpDTO> suivisEntrp = getAllSuiviActionRecouvrtEntreprise();
        List<SuiviActionRecouvrementPartDTO> suivisPart = getAllSuiviActionRecouvrtParticulier();

        List<SuiviActionRecouvrementDTO> allSuivis = new ArrayList<>();
        allSuivis.addAll(suivisEntrp);
        allSuivis.addAll(suivisPart);

        return allSuivis;
    }

    @Override
    public Optional<SuiviActionRecouvrementEntrpDTO> getSuiviActionRecouvrtEntrepriseById(Long id) {
        Optional<SuiviActionRecouvrementE> optionalSuiviActionRecouvrementEntrp = suiviActionRecouvrementEntrpRepository.findById(id);
        return optionalSuiviActionRecouvrementEntrp.map(suiviActionRecouvrementEntrp -> modelMapper.map(suiviActionRecouvrementEntrp, SuiviActionRecouvrementEntrpDTO.class));
    }

    @Override
    public Optional<SuiviActionRecouvrementPartDTO> getSuiviActionRecouvrtParticulierById(Long id) {
        Optional<SuiviActionRecouvrementP> optionalSuiviActionRecouvrementPart = suiviActionRecouvrementPartRepository.findById(id);
        return optionalSuiviActionRecouvrementPart.map(suiviActionRecouvrementPart -> modelMapper.map(suiviActionRecouvrementPart, SuiviActionRecouvrementPartDTO.class));
    }
}
