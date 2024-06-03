package net.nak.RestControllers;

import net.nak.DTO.*;
import net.nak.services.SuiviActionRecouvrtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/annexes")
public class SuiviActionRecouvrtRestController {

    @Autowired
    private SuiviActionRecouvrtService suiviActionRecouvrtService;

    @PostMapping("/addSuiviActionRecouvrtE")
    public SuiviActionRecouvrementEntrpDTO addSuiviActionRecouvrtEntreprise(@RequestBody SuiviActionRecouvrementEntrpDTO suiviActionRecouvrementEntrpDTO) {
        return suiviActionRecouvrtService.addSuiviActionRecouvrtEntreprise(suiviActionRecouvrementEntrpDTO);
    }

    @PostMapping("/addSuiviActionRecouvrtP")
    public SuiviActionRecouvrementPartDTO addSuiviActionRecouvrtParticulier(@RequestBody SuiviActionRecouvrementPartDTO suiviActionRecouvrementPartDTO) {
        return suiviActionRecouvrtService.addSuiviActionRecouvrtParticulier(suiviActionRecouvrementPartDTO);
    }

    @PutMapping("/updateSuiviActionRecouvrtE/{id}")
    public SuiviActionRecouvrementEntrpDTO updateSuiviActionRecouvrtEntreprise(@PathVariable Long id, @RequestBody SuiviActionRecouvrementEntrpDTO suiviActionRecouvrementEntrpDTO) {
        return suiviActionRecouvrtService.updateSuiviActionRecouvrtEntreprise(id, suiviActionRecouvrementEntrpDTO);
    }

    @PutMapping("/updateSuiviActionRecouvrtP/{id}")
    public SuiviActionRecouvrementPartDTO updateSuiviActionRecouvrtParticulier(@PathVariable Long id, @RequestBody SuiviActionRecouvrementPartDTO suiviActionRecouvrementPartDTO) {
        return suiviActionRecouvrtService.updateSuiviActionRecouvrtParticulier(id, suiviActionRecouvrementPartDTO);
    }

    @DeleteMapping("/deleteSuiviActionRecouvrtE/{id}")
    public void deleteSuiviActionRecouvrtEntreprise(@PathVariable Long id) {suiviActionRecouvrtService.deleteSuiviActionRecouvrtEntreprise(id);}

    @DeleteMapping("/deleteSuiviActionRecouvrtP/{id}")
    public void deleteSuiviActionRecouvrtParticulier(@PathVariable Long id) {suiviActionRecouvrtService.deleteSuiviActionRecouvrtParticulier(id);}

    @GetMapping("/getAllSuiviActionRecouvrt")
    public List<SuiviActionRecouvrementDTO> getAllSuiviActionRecouvrt() {
        return suiviActionRecouvrtService.getAllSuiviActionRecouvrt();
    }

    @GetMapping("/getAllSuiviActionRecouvrtE")
    public List<SuiviActionRecouvrementEntrpDTO> getAllSuiviActionRecouvrtEntreprise() {
        return suiviActionRecouvrtService.getAllSuiviActionRecouvrtEntreprise();
    }

    @GetMapping("/getAllSuiviActionRecouvrtP")
    public List<SuiviActionRecouvrementPartDTO> getAllSuiviActionRecouvrtParticulier() {
        return suiviActionRecouvrtService.getAllSuiviActionRecouvrtParticulier();
    }

    @GetMapping("/getSuiviActionRecouvrtEntrepriseById/{id}")
    public Optional<SuiviActionRecouvrementEntrpDTO> getSuiviActionRecouvrtEntrepriseById(@PathVariable Long id) {
        return suiviActionRecouvrtService.getSuiviActionRecouvrtEntrepriseById(id);
    }

    @GetMapping("/getSuiviActionRecouvrtParticulierById/{id}")
    public Optional<SuiviActionRecouvrementPartDTO> getSuiviActionRecouvrtParticulierById(@PathVariable Long id) {
        return suiviActionRecouvrtService.getSuiviActionRecouvrtParticulierById(id);
    }

}
