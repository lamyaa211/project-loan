package net.nak.services;

import net.nak.DTO.ListeDemandesBeneficeDTO;

import java.util.List;

public interface LDemandesBenificeService {
    ListeDemandesBeneficeDTO addlisteDemandesBenifice(ListeDemandesBeneficeDTO listeDemandesBenificeDTO);

    ListeDemandesBeneficeDTO updatelisteDemandesBenifice(Long id, ListeDemandesBeneficeDTO listeDemandesBenificeDTO);

    void deletelisteDemandesBenifice(Long id);

    ListeDemandesBeneficeDTO getlisteDemandesBenificeById(Long id);

    List<ListeDemandesBeneficeDTO> getAlllisteDemandesBenifice();
}

