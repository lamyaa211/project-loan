package net.nak.services;

import net.nak.DTO.EtatEvenementsAvantCreditDTO;
import java.util.List;

public interface EtatEvenementsACService {
    EtatEvenementsAvantCreditDTO addEtatEvenementsAC(EtatEvenementsAvantCreditDTO etatEvenementsAvantCreditDTO);

    EtatEvenementsAvantCreditDTO updateEtatEvenementsAC(Long id, EtatEvenementsAvantCreditDTO etatEvenementsAvantCreditDTO);

    void deleteEtatEvenementsAC(Long id);

    EtatEvenementsAvantCreditDTO getEtatEvenementsACById(Long id);

    List<EtatEvenementsAvantCreditDTO> getAllEtatEvenementsAC();
}
