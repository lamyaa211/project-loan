package net.nak.services;

import net.nak.DTO.*;
import net.nak.entities.EtatDeblocageE;
import net.nak.entities.EtatDeblocageP;
import net.nak.repositories.EtatDeblocageERepository;
import net.nak.repositories.EtatDeblocagePRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EtatDeblocageServiceImpl implements EtatDeblocageService {

    private final EtatDeblocagePRepository etatDeblocagePRepository;
    private final EtatDeblocageERepository etatDeblocageERepository;
    private final ModelMapper modelMapper;

    public EtatDeblocageServiceImpl(EtatDeblocagePRepository etatDeblocagePRepository, EtatDeblocageERepository etatDeblocageERepository) {
        this.etatDeblocagePRepository = etatDeblocagePRepository;
        this.etatDeblocageERepository = etatDeblocageERepository;
        this.modelMapper = new ModelMapper();
    }

    @Override
    public EtatDeblocagePDTO addDeblParticulier(EtatDeblocagePDTO etatDeblocagePDTO) {
        EtatDeblocageP etatDeblocageP = modelMapper.map(etatDeblocagePDTO, EtatDeblocageP.class);
        etatDeblocageP = etatDeblocagePRepository.save(etatDeblocageP);
        return modelMapper.map(etatDeblocageP, EtatDeblocagePDTO.class);
    }

    @Override
    public EtatDeblocageEDTO addDeblEntreprise(EtatDeblocageEDTO etatDeblocageEDTO) {
        EtatDeblocageE etatDeblocageE = modelMapper.map(etatDeblocageEDTO, EtatDeblocageE.class);
        etatDeblocageE = etatDeblocageERepository.save(etatDeblocageE);
        return modelMapper.map(etatDeblocageE, EtatDeblocageEDTO.class);
    }

    @Override
    public EtatDeblocagePDTO updateDeblParticulier(Long id, EtatDeblocagePDTO etatDeblocagePDTO) {
        Optional<EtatDeblocageP> existingDeblocageOpt = etatDeblocagePRepository.findById(id);
        if (existingDeblocageOpt.isPresent()) {
            EtatDeblocageP etatDeblocageP = existingDeblocageOpt.get();
            modelMapper.map(etatDeblocagePDTO, etatDeblocageP);
            etatDeblocageP = etatDeblocagePRepository.save(etatDeblocageP);
            return modelMapper.map(etatDeblocageP, EtatDeblocagePDTO.class);
        }
        return null;
    }

    @Override
    public EtatDeblocageEDTO updateDeblEntreprise(Long id, EtatDeblocageEDTO etatDeblocageEDTO) {
        Optional<EtatDeblocageE> existingDeblocageOpt = etatDeblocageERepository.findById(id);
        if (existingDeblocageOpt.isPresent()) {
            EtatDeblocageE etatDeblocageE = existingDeblocageOpt.get();
            modelMapper.map(etatDeblocageEDTO, etatDeblocageE);
            etatDeblocageE = etatDeblocageERepository.save(etatDeblocageE);
            return modelMapper.map(etatDeblocageE, EtatDeblocageEDTO.class);
        }
        return null;
    }

    @Override
    public void deleteDeblParticulier(Long id) {
        etatDeblocagePRepository.deleteById(id);
    }

    @Override
    public void deleteDeblEntreprise(Long id) {
        etatDeblocageERepository.deleteById(id);
    }

    @Override
    public Optional<EtatDeblocagePDTO> getDeblParticulierById(Long id) {
        Optional<EtatDeblocageP> optionalEtatDeblocageP = etatDeblocagePRepository.findById(id);
        return optionalEtatDeblocageP.map(deblocageCreditP -> modelMapper.map(deblocageCreditP, EtatDeblocagePDTO.class));
    }

    @Override
    public Optional<EtatDeblocageEDTO> getDeblEntrepriseById(Long id) {
        Optional<EtatDeblocageE> optionalEtatDeblocageE = etatDeblocageERepository.findById(id);
        return optionalEtatDeblocageE.map(deblocageCreditE -> modelMapper.map(deblocageCreditE, EtatDeblocageEDTO.class));
    }

    @Override
    public List<EtatDeblocagePDTO> getAllDeblParticulier() {
        List<EtatDeblocageP> etatDeblocageP = etatDeblocagePRepository.findAll();
        return etatDeblocageP.stream().map(deblocageCreditP -> modelMapper.map(deblocageCreditP, EtatDeblocagePDTO.class)).collect(Collectors.toList());
    }

    @Override
    public List<EtatDeblocageEDTO> getAllDeblEntreprise() {
        List<EtatDeblocageE> etatDeblocageE = etatDeblocageERepository.findAll();
        return etatDeblocageE.stream().map(deblocageCreditE -> modelMapper.map(deblocageCreditE, EtatDeblocageEDTO.class)).collect(Collectors.toList());
    }

    @Override
    public List<EtatDeblocageCreditDTO> getAllDeblocageCredit() {
        List<EtatDeblocagePDTO> etatDeblocagePDTO = getAllDeblParticulier();
        List<EtatDeblocageEDTO> etatDeblocageEDTO = getAllDeblEntreprise();
        List<EtatDeblocageCreditDTO> allDeblocageCredit = new ArrayList<>();
        allDeblocageCredit.addAll(etatDeblocagePDTO);
        allDeblocageCredit.addAll(etatDeblocageEDTO);
        return allDeblocageCredit;
    }
}
