package net.nak.services;

import net.nak.DTO.EtatDeblocageEDTO;
import net.nak.DTO.EtatDeblocagePDTO;
import net.nak.DTO.EtatDeblocageCreditDTO;
import java.util.List;
import java.util.Optional;

public interface EtatDeblocageService {
    EtatDeblocagePDTO addDeblParticulier(EtatDeblocagePDTO etatDeblocagePDTO);
    EtatDeblocageEDTO addDeblEntreprise(EtatDeblocageEDTO etatDeblocageEDTO);
    EtatDeblocagePDTO updateDeblParticulier(Long id, EtatDeblocagePDTO etatDeblocagePDTO);
    EtatDeblocageEDTO updateDeblEntreprise(Long id, EtatDeblocageEDTO etatDeblocageEDTO);
    void deleteDeblParticulier(Long id);
    void deleteDeblEntreprise(Long id);
    Optional<EtatDeblocagePDTO> getDeblParticulierById(Long id);
    Optional<EtatDeblocageEDTO> getDeblEntrepriseById(Long id);
    List<EtatDeblocagePDTO> getAllDeblParticulier();
    List<EtatDeblocageEDTO> getAllDeblEntreprise();
    List<EtatDeblocageCreditDTO> getAllDeblocageCredit();
}
