package net.nak.services;

import net.nak.DTO.EtatEvenementsAvantCreditDTO;
import net.nak.entities.EtatEvenementsAvantCredit;
import net.nak.repositories.EtatEvenementsAvantCreditRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EtatEvenementsACServiceImpl implements EtatEvenementsACService {
    private final EtatEvenementsAvantCreditRepository etatEvenementsACRepository;
    private final ModelMapper modelMapper;

    public EtatEvenementsACServiceImpl(EtatEvenementsAvantCreditRepository etatEvenementsACRepository,ModelMapper modelMapper ) {
        this.etatEvenementsACRepository = etatEvenementsACRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public EtatEvenementsAvantCreditDTO addEtatEvenementsAC(EtatEvenementsAvantCreditDTO etatEvenementsAvantCreditDTO) {
        EtatEvenementsAvantCredit etatEvenementsAvantCredit = modelMapper.map(etatEvenementsAvantCreditDTO, EtatEvenementsAvantCredit.class);
        EtatEvenementsAvantCredit savedEtatEvenementsAvantCredit = etatEvenementsACRepository.save(etatEvenementsAvantCredit);
        return modelMapper.map(savedEtatEvenementsAvantCredit, EtatEvenementsAvantCreditDTO.class);
    }

    @Override
    public EtatEvenementsAvantCreditDTO updateEtatEvenementsAC(Long id, EtatEvenementsAvantCreditDTO etatEvenementsAvantCreditDTO) {
        EtatEvenementsAvantCredit existingEtatEvenementsAvantCredit = etatEvenementsACRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("EtatEvenementsAvantCredit not found with id: " + id));
        modelMapper.map(etatEvenementsAvantCreditDTO, existingEtatEvenementsAvantCredit);
        EtatEvenementsAvantCredit updatedEtatEvenementsAvantCredit = etatEvenementsACRepository.save(existingEtatEvenementsAvantCredit);
        return modelMapper.map(updatedEtatEvenementsAvantCredit, EtatEvenementsAvantCreditDTO.class);
    }

    @Override
    public void deleteEtatEvenementsAC(Long id) {
        etatEvenementsACRepository.deleteById(id);
    }

    @Override
    public EtatEvenementsAvantCreditDTO getEtatEvenementsACById(Long id) {
        EtatEvenementsAvantCredit etatEvenementsAvantCredit = etatEvenementsACRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("EtatEvenementsAvantCredit not found with id: " + id));
        return modelMapper.map(etatEvenementsAvantCredit, EtatEvenementsAvantCreditDTO.class);
    }

    @Override
    public List<EtatEvenementsAvantCreditDTO> getAllEtatEvenementsAC() {
        List<EtatEvenementsAvantCredit> allEtatEvenementsAC = etatEvenementsACRepository.findAll();
        return allEtatEvenementsAC.stream()
                .map(etatEvenementsAvantCredit -> modelMapper.map(etatEvenementsAvantCredit, EtatEvenementsAvantCreditDTO.class))
                .collect(Collectors.toList());
    }
}
