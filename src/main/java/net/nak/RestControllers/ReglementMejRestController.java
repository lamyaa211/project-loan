package net.nak.RestControllers;

import net.nak.DTO.ReglementMejDTO;
import net.nak.services.ReglementMejService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/reglementMej")
public class ReglementMejRestController {

        @Autowired
        private ReglementMejService reglementMejService;

        @PostMapping("/addReglementMej")
        public ResponseEntity<ReglementMejDTO> addReglementMej(@RequestBody ReglementMejDTO reglementMejDTO) {
            ReglementMejDTO savedReglementMej = reglementMejService.addReglementMej(reglementMejDTO);
            return ResponseEntity.ok(savedReglementMej);
        }

        @PutMapping("/updateReglementMej/{id}")
        public ResponseEntity<ReglementMejDTO> updateReglementMej(@PathVariable Long id, @RequestBody ReglementMejDTO reglementMejDTO) {
            ReglementMejDTO updatedReglementMejDTO = reglementMejService.updateReglementMej(id, reglementMejDTO);
            return ResponseEntity.ok(updatedReglementMejDTO);
        }

        @DeleteMapping("/deleteReglementMej/{id}")
        public ResponseEntity<String> deleteReglementMej(@PathVariable Long id) {
            reglementMejService.deleteReglementMej(id);
            return ResponseEntity.ok("Reglement Mej deleted successfully");
        }

        @GetMapping("/getReglementMejById/{id}")
        public ResponseEntity<ReglementMejDTO> getReglementMejById(@PathVariable Long id) {
            ReglementMejDTO reglementMejDTO = reglementMejService.getReglementMejById(id);
            return ResponseEntity.ok(reglementMejDTO);
        }

        @GetMapping("/getAllChangementDebiteur")
        public ResponseEntity<List<ReglementMejDTO>> getAllReglementMej() {
            List<ReglementMejDTO> reglementMejDTOList = reglementMejService.getAllReglementMej();
            return ResponseEntity.ok(reglementMejDTOList);
        }


}
