package net.nak.services;

import net.nak.DTO.ChangementDebiteurDTO;

import java.util.List;

public interface ChangementDebiteurService {
        ChangementDebiteurDTO addChangementDebiteur(ChangementDebiteurDTO changementDebiteurDTO);
        ChangementDebiteurDTO updateChangementDebiteur(Long id, ChangementDebiteurDTO changementDebiteurDTO);
        void deleteChangementDebiteur(Long id);
        ChangementDebiteurDTO getChangementDebiteurById(Long id);
        List<ChangementDebiteurDTO> getAllChangementDebiteur();

}
