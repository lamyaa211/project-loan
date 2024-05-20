package net.nak.services;

import net.nak.DTO.DetailReglementRistourneDTO;

import java.util.List;

public interface DReglementRistourneService {
    DetailReglementRistourneDTO addDetailReglementRistourne(DetailReglementRistourneDTO detailReglementRistourneDTO);

    DetailReglementRistourneDTO updateDetailReglementRistourne(Long id, DetailReglementRistourneDTO detailReglementRistourneDTO);

    void deleteDetailReglementRistourne(Long id);

    DetailReglementRistourneDTO getDetailReglementRistourneById(Long id);

    List<DetailReglementRistourneDTO> getAllDetailReglementRistourne();
}
