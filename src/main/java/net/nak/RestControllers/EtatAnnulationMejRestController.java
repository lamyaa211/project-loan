package net.nak.RestControllers;

import net.nak.DTO.AnnulationTAMDTO;
import net.nak.DTO.EtatAnnulationMejDTO;
import net.nak.services.EtatAnnulationMejService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/etatAnnulationMej")
public class EtatAnnulationMejRestController {

        @Autowired
        private EtatAnnulationMejService etatAnnulationMejService;

        @PostMapping("/addEtatAnnulationMej")
        public ResponseEntity<EtatAnnulationMejDTO> addEtatAnnulationMej(@RequestBody EtatAnnulationMejDTO etatAnnulationMejDTO) {
            EtatAnnulationMejDTO savedEtatAnnulationMejDTO = etatAnnulationMejService.addEtatAnnulationMej(etatAnnulationMejDTO);
            return ResponseEntity.ok(savedEtatAnnulationMejDTO);
        }

        @PutMapping("/updateEtatAnnulationMej/{id}")
        public ResponseEntity<EtatAnnulationMejDTO> updateEtatAnnulationMej(@PathVariable Long id, @RequestBody EtatAnnulationMejDTO etatAnnulationMejDTO) {
            EtatAnnulationMejDTO updatedEtatAnnulationMejDTO = etatAnnulationMejService.updateEtatAnnulationMej(id, etatAnnulationMejDTO);
            return ResponseEntity.ok(updatedEtatAnnulationMejDTO);
        }

        @DeleteMapping("/deleteEtatAnnulationMej/{id}")
        public ResponseEntity<String> deleteEtatAnnulationMej(@PathVariable Long id) {
            etatAnnulationMejService.deleteEtatAnnulationMej(id);
            return ResponseEntity.ok("Etat Annulation MEJ deleted successfully");
        }

        @GetMapping("/getEtatAnnulationMejById/{id}")
        public ResponseEntity<EtatAnnulationMejDTO> getEtatAnnulationMejById(@PathVariable Long id) {
            EtatAnnulationMejDTO etatAnnulationMejDTO = etatAnnulationMejService.getEtatAnnulationMejById(id);
            return ResponseEntity.ok(etatAnnulationMejDTO);
        }

        @GetMapping("/getAllEtatAnnulationMej")
        public ResponseEntity<List<EtatAnnulationMejDTO>> getAllEtatAnnulationMej() {
            List<EtatAnnulationMejDTO> etatAnnulationMejDTOList = etatAnnulationMejService.getAllEtatAnnulationMej();
            return ResponseEntity.ok(etatAnnulationMejDTOList);
        }


}
