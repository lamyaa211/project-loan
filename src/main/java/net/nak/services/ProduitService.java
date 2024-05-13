package net.nak.services;

import net.nak.DTO.ProduitDTO;
import net.nak.DTO.ProduitEntrepriseDTO;
import net.nak.DTO.ProduitParticulierDTO;

import java.util.List;
import java.util.Optional;

public interface ProduitService {

    ProduitEntrepriseDTO ajouterProduitEntreprise(ProduitEntrepriseDTO produitEntrepriseDTO);

    ProduitParticulierDTO ajouterProduitParticulier(ProduitParticulierDTO produitParticulierDTO);

    ProduitEntrepriseDTO modifierProduitEntreprise(Long id, ProduitEntrepriseDTO produitEntrepriseDTO);

    ProduitParticulierDTO modifierProduitParticulier(Long id, ProduitParticulierDTO produitParticulierDTO);

    void supprimerProduitEntreprise(Long id);

    void supprimerProduitParticulier(Long id);

    List<ProduitEntrepriseDTO> getAllProduitsEntreprise();

    List<ProduitParticulierDTO> getAllProduitsParticulier();

    List<ProduitDTO> getAllProduits();

    Optional<ProduitEntrepriseDTO> getProduitEntrepriseById(Long id);

    Optional<ProduitParticulierDTO> getProduitParticulierById(Long id);
}
