package net.nak.services;

import net.nak.DTO.EtatAnnulationMejDTO;
import java.util.List;

public interface EtatAnnulationMejService {

    EtatAnnulationMejDTO addEtatAnnulationMej(EtatAnnulationMejDTO etatAnnulationMejDTO);

    EtatAnnulationMejDTO updateEtatAnnulationMej(Long id, EtatAnnulationMejDTO etatAnnulationMejDTO);

    void deleteEtatAnnulationMej(Long id);

    EtatAnnulationMejDTO getEtatAnnulationMejById(Long id);

    List<EtatAnnulationMejDTO> getAllEtatAnnulationMej();
}
