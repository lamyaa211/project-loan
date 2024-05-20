package net.nak.services;

import net.nak.DTO.AnnulationTAMDTO;

import java.util.List;

public interface AnnulationTAMService {

    AnnulationTAMDTO addAnnulationTAM(AnnulationTAMDTO annulationTamDTO);

    AnnulationTAMDTO updateAnnulationTAM(Long id, AnnulationTAMDTO annulationTamDTO);

    void deleteAnnulationTAM(Long id);

    AnnulationTAMDTO getAnnulationTAMById(Long id);

    List<AnnulationTAMDTO> getAllAnnulationTAM();

    }
