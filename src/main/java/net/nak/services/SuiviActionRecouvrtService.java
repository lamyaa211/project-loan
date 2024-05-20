package net.nak.services;

import net.nak.DTO.SuiviActionRecouvrementDTO;
import net.nak.DTO.SuiviActionRecouvrementEntrpDTO;
import net.nak.DTO.SuiviActionRecouvrementPartDTO;
import java.util.List;
import java.util.Optional;

public interface SuiviActionRecouvrtService {

    SuiviActionRecouvrementEntrpDTO addSuiviActionRecouvrtEntreprise(SuiviActionRecouvrementEntrpDTO suiviActionRecouvrementEntrpDTO);
    SuiviActionRecouvrementPartDTO addSuiviActionRecouvrtParticulier(SuiviActionRecouvrementPartDTO suiviActionRecouvrementPartDTO);
    SuiviActionRecouvrementEntrpDTO updateSuiviActionRecouvrtEntreprise(Long id, SuiviActionRecouvrementEntrpDTO suiviActionRecouvrementEntrpDTO);
    SuiviActionRecouvrementPartDTO updateSuiviActionRecouvrtParticulier(Long id, SuiviActionRecouvrementPartDTO suiviActionRecouvrementPartDTO);
    void deleteSuiviActionRecouvrtEntreprise(Long id);
    void deleteSuiviActionRecouvrtParticulier(Long id);
    List<SuiviActionRecouvrementEntrpDTO> getAllSuiviActionRecouvrtEntreprise();
    List<SuiviActionRecouvrementPartDTO> getAllSuiviActionRecouvrtParticulier();
    List<SuiviActionRecouvrementDTO> getAllSuiviActionRecouvrt();
    Optional<SuiviActionRecouvrementEntrpDTO> getSuiviActionRecouvrtEntrepriseById(Long id);
    Optional<SuiviActionRecouvrementPartDTO> getSuiviActionRecouvrtParticulierById(Long id);
}

