package net.nak.services;

import net.nak.DTO.TAMDTO;
import java.util.List;

public interface TAMService {
    TAMDTO addTAM(TAMDTO tamDTO);

    TAMDTO updatedTAM(Long id, TAMDTO tamDTO);

    void deleteTAM(Long id);

    TAMDTO getTAMById(Long id);

    List<TAMDTO> getAllTAM();
}

