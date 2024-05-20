package net.nak.services;

import net.nak.DTO.ListeDemandesBenificeDTO;

import java.util.List;

public interface LDemandesBenificeService {
    ListeDemandesBenificeDTO addlisteDemandesBenifice(ListeDemandesBenificeDTO listeDemandesBenificeDTO);

    ListeDemandesBenificeDTO updatelisteDemandesBenifice(Long id, ListeDemandesBenificeDTO listeDemandesBenificeDTO);

    void deletelisteDemandesBenifice(Long id);

    ListeDemandesBenificeDTO getlisteDemandesBenificeById(Long id);

    List<ListeDemandesBenificeDTO> getAlllisteDemandesBenifice();
}

