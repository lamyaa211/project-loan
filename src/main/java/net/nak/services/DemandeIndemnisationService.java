package net.nak.services;

import net.nak.DTO.*;

import java.util.List;
import java.util.Optional;

public interface DemandeIndemnisationService {

        DemandeIndemnisationPartDTO addDemandeIndemnisationP(DemandeIndemnisationPartDTO demandeIndemnisationPartDTO);
        DemandeIndemnisationEntrepDTO addDemandeIndemnisationE(DemandeIndemnisationEntrepDTO demandeIndemnisationEntrepDTO);
        DemandeIndemnisationPartDTO updateDemandeIndemnisationP(Long id, DemandeIndemnisationPartDTO demandeIndemnisationPartDTO);
        DemandeIndemnisationEntrepDTO updateDemandeIndemnisationE(Long id, DemandeIndemnisationEntrepDTO demandeIndemnisationEntrepDTO);
        void deleteDemandeIndemnisationP(Long id);
        void deleteDemandeIndemnisationE(Long id);
        List<DemandeIndemnisationDTO> getAllDemandeIndemnisation();
        List<DemandeIndemnisationPartDTO> getAllDemandeIndemnisationP();
        List<DemandeIndemnisationEntrepDTO> getAllDemandeIndemnisationE();
        Optional<DemandeIndemnisationPartDTO> getDemandeIndemnisationPById(Long id);
        Optional<DemandeIndemnisationEntrepDTO> getDemandeIndemnisationEById(Long id);


}
