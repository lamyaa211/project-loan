package net.nak.RestControllers;

import net.nak.DTO.AnnulationTAMDTO;
import net.nak.services.AnnulationTAMService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/annexes")
public class AnnulationTAMRestController {

    @Autowired
    private AnnulationTAMService annulationTAMService;

    @PostMapping("/addAnnulationTAM")
    public ResponseEntity<AnnulationTAMDTO> addAnnulationTAM(@RequestBody AnnulationTAMDTO annulationTAMDTO) {
        AnnulationTAMDTO savedAnnulationTAMDTO = annulationTAMService.addAnnulationTAM(annulationTAMDTO);
        return ResponseEntity.ok(savedAnnulationTAMDTO);
    }

    @PutMapping("/updateAnnulationTAM/{id}")
    public ResponseEntity<AnnulationTAMDTO> updateAnnulationTAM(@PathVariable Long id, @RequestBody AnnulationTAMDTO annulationTAMDTO) {
        AnnulationTAMDTO updatedAnnulationTAMDTO = annulationTAMService.updateAnnulationTAM(id, annulationTAMDTO);
        return ResponseEntity.ok(updatedAnnulationTAMDTO);
    }

    @DeleteMapping("/deleteAnnulationTAM/{id}")
    public ResponseEntity<String> deleteAnnulationTAM(@PathVariable Long id) {
        annulationTAMService.deleteAnnulationTAM(id);
        return ResponseEntity.ok("AnnulationTam deleted successfully");
    }

    @GetMapping("/getAnnulationTAMById/{id}")
    public ResponseEntity<AnnulationTAMDTO> getAnnulationTAMById(@PathVariable Long id) {
        AnnulationTAMDTO annulationTAMDTO = annulationTAMService.getAnnulationTAMById(id);
        return ResponseEntity.ok(annulationTAMDTO);
    }

    @GetMapping("/getAllAnnulationTAM")
    public ResponseEntity<List<AnnulationTAMDTO>> getAllAnnulationTAM() {
        List<AnnulationTAMDTO> annulationTamDTOList = annulationTAMService.getAllAnnulationTAM();
        return ResponseEntity.ok(annulationTamDTOList);
    }
}
