package net.nak.RestControllers;

import net.nak.DTO.TAMDTO;
import net.nak.services.TAMService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/annexes")
public class TAMRestController {


        @Autowired
        private TAMService tamService;

        @PostMapping("/addTAM")
        public ResponseEntity<TAMDTO> addTAM(@RequestBody TAMDTO tamDTO) {
            TAMDTO savedTAMDTO = tamService.addTAM(tamDTO);
            return ResponseEntity.ok(savedTAMDTO);
        }

        @PutMapping("/updatedTAM/{id}")
        public ResponseEntity<TAMDTO> updatedTAM(@PathVariable Long id, @RequestBody TAMDTO tamDTO) {
            TAMDTO updatedTAMDTO = tamService.updatedTAM(id, tamDTO);
            return ResponseEntity.ok(updatedTAMDTO);
        }

        @DeleteMapping("/deleteTAM/{id}")
        public ResponseEntity<String> deleteTAM(@PathVariable Long id) {
            tamService.deleteTAM(id);
            return ResponseEntity.ok("Tam deleted successfully");
        }

        @GetMapping("/getTAMById/{id}")
        public ResponseEntity<TAMDTO> getTAMById(@PathVariable Long id) {
            TAMDTO tamDTO = tamService.getTAMById(id);
            return ResponseEntity.ok(tamDTO);
        }

        @GetMapping("/getAllTAM")
        public ResponseEntity<List<TAMDTO>> getAllTAM() {
            List<TAMDTO> tamDTOList = tamService.getAllTAM();
            return ResponseEntity.ok(tamDTOList);
        }


}
