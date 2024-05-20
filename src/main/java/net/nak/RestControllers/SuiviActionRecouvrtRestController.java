package net.nak.RestControllers;

import net.nak.DTO.*;
import net.nak.services.SuiviActionRecouvrtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/SuiviActionRecouvrt")
public class SuiviActionRecouvrtRestController {

    @Autowired
    private SuiviActionRecouvrtService suiviActionRecouvrtService;

    @PostMapping("/add/entreprise")
    public SuiviActionRecouvrementEntrpDTO addSuiviActionRecouvrtEntreprise(@RequestBody SuiviActionRecouvrementEntrpDTO suiviActionRecouvrementEntrpDTO) {
        return suiviActionRecouvrtService.addSuiviActionRecouvrtEntreprise(suiviActionRecouvrementEntrpDTO);
    }

    @PostMapping("/add/particulier")
    public SuiviActionRecouvrementPartDTO addSuiviActionRecouvrtParticulier(@RequestBody SuiviActionRecouvrementPartDTO suiviActionRecouvrementPartDTO) {
        return suiviActionRecouvrtService.addSuiviActionRecouvrtParticulier(suiviActionRecouvrementPartDTO);
    }

    @PutMapping("/update/entreprise/{id}")
    public SuiviActionRecouvrementEntrpDTO updateSuiviActionRecouvrtEntreprise(@PathVariable Long id, @RequestBody SuiviActionRecouvrementEntrpDTO suiviActionRecouvrementEntrpDTO) {
        return suiviActionRecouvrtService.updateSuiviActionRecouvrtEntreprise(id, suiviActionRecouvrementEntrpDTO);
    }

    @PutMapping("/update/particulier/{id}")
    public SuiviActionRecouvrementPartDTO updateSuiviActionRecouvrtParticulier(@PathVariable Long id, @RequestBody SuiviActionRecouvrementPartDTO suiviActionRecouvrementPartDTO) {
        return suiviActionRecouvrtService.updateSuiviActionRecouvrtParticulier(id, suiviActionRecouvrementPartDTO);
    }

    @DeleteMapping("/delete/entreprise/{id}")
    public void deleteSuiviActionRecouvrtEntreprise(@PathVariable Long id) {suiviActionRecouvrtService.deleteSuiviActionRecouvrtEntreprise(id);}

    @DeleteMapping("/delete/particulier/{id}")
    public void deleteSuiviActionRecouvrtParticulier(@PathVariable Long id) {suiviActionRecouvrtService.deleteSuiviActionRecouvrtParticulier(id);}

    @GetMapping("/getAllSuiviActionRecouvrt")
    public List<SuiviActionRecouvrementDTO> getAllSuiviActionRecouvrt() {
        return suiviActionRecouvrtService.getAllSuiviActionRecouvrt();
    }

    @GetMapping("/getAllSuiviActionRecouvrtEntreprise")
    public List<SuiviActionRecouvrementEntrpDTO> getAllSuiviActionRecouvrtEntreprise() {
        return suiviActionRecouvrtService.getAllSuiviActionRecouvrtEntreprise();
    }

    @GetMapping("/getAllSuiviActionRecouvrtParticulier")
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
