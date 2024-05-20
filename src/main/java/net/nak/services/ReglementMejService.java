package net.nak.services;

import net.nak.DTO.ReglementMejDTO;
import java.util.List;

public interface ReglementMejService {
    ReglementMejDTO addReglementMej(ReglementMejDTO reglementMejDTO);
    ReglementMejDTO updateReglementMej(Long id, ReglementMejDTO reglementMejDTO);
    void deleteReglementMej(Long id);
    ReglementMejDTO getReglementMejById(Long id);
    List<ReglementMejDTO> getAllReglementMej();
}
