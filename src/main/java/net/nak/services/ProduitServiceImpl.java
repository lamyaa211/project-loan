package net.nak.services;

import net.nak.DTO.ProduitDTO;
import net.nak.DTO.ProduitEntrepriseDTO;
import net.nak.DTO.ProduitParticulierDTO;
import net.nak.entities.ProduitEntreprise;
import net.nak.entities.ProduitParticulier;
import net.nak.repositories.ProduitEntrepriseRepository;
import net.nak.repositories.ProduitParticulierRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProduitServiceImpl implements ProduitService {

    private final ProduitEntrepriseRepository produitEntrepriseRepository;
    private final ProduitParticulierRepository produitParticulierRepository;

    private final ModelMapper modelMapper;

    public ProduitServiceImpl(ProduitEntrepriseRepository produitEntrepriseRepository, ProduitParticulierRepository produitParticulierRepository) {
        this.produitEntrepriseRepository = produitEntrepriseRepository;
        this.produitParticulierRepository = produitParticulierRepository;
        this.modelMapper = new ModelMapper();
    }

    @Override
    public ProduitEntrepriseDTO ajouterProduitEntreprise(ProduitEntrepriseDTO produitEntrepriseDTO) {
        ProduitEntreprise produitEntreprise = modelMapper.map(produitEntrepriseDTO, ProduitEntreprise.class);
        produitEntreprise = produitEntrepriseRepository.save(produitEntreprise);
        return modelMapper.map(produitEntreprise, ProduitEntrepriseDTO.class);
    }

    @Override
    public ProduitParticulierDTO ajouterProduitParticulier(ProduitParticulierDTO produitParticulierDTO) {
        ProduitParticulier produitParticulier = modelMapper.map(produitParticulierDTO, ProduitParticulier.class);
        produitParticulier = produitParticulierRepository.save(produitParticulier);
        return modelMapper.map(produitParticulier, ProduitParticulierDTO.class);
    }

    @Override
    public ProduitEntrepriseDTO modifierProduitEntreprise(Long id, ProduitEntrepriseDTO produitEntrepriseDTO) {
        Optional<ProduitEntreprise> optionalProduitEntreprise = produitEntrepriseRepository.findById(id);
        if (optionalProduitEntreprise.isPresent()) {
            ProduitEntreprise produitEntreprise = optionalProduitEntreprise.get();
            modelMapper.map(produitEntrepriseDTO, produitEntreprise);
            produitEntreprise = produitEntrepriseRepository.save(produitEntreprise);
            return modelMapper.map(produitEntreprise, ProduitEntrepriseDTO.class);
        }
        return null;
    }

    @Override
    public ProduitParticulierDTO modifierProduitParticulier(Long id, ProduitParticulierDTO produitParticulierDTO) {
        Optional<ProduitParticulier> optionalProduitParticulier = produitParticulierRepository.findById(id);
        if (optionalProduitParticulier.isPresent()) {
            ProduitParticulier produitParticulier = optionalProduitParticulier.get();
            modelMapper.map(produitParticulierDTO, produitParticulier);
            produitParticulier = produitParticulierRepository.save(produitParticulier);
            return modelMapper.map(produitParticulier, ProduitParticulierDTO.class);
        }
        return null;
    }

    @Override
    public void supprimerProduitEntreprise(Long id) {
        produitEntrepriseRepository.deleteById(id);
    }

    @Override
    public void supprimerProduitParticulier(Long id) {
        produitParticulierRepository.deleteById(id);
    }

    @Override
    public List<ProduitEntrepriseDTO> getAllProduitsEntreprise() {
        List<ProduitEntreprise> produitsEntreprise = produitEntrepriseRepository.findAll();
        return produitsEntreprise.stream().map(produit -> modelMapper.map(produit, ProduitEntrepriseDTO.class)).collect(Collectors.toList());
    }

    @Override
    public List<ProduitParticulierDTO> getAllProduitsParticulier() {
        List<ProduitParticulier> produitsParticulier = produitParticulierRepository.findAll();
        return produitsParticulier.stream().map(produit -> modelMapper.map(produit, ProduitParticulierDTO.class)).collect(Collectors.toList());
    }

    @Override
    public List<ProduitDTO> getAllProduits() {
        List<ProduitEntrepriseDTO> produitsEntreprise = getAllProduitsEntreprise();
        List<ProduitParticulierDTO> produitsParticulier = getAllProduitsParticulier();

        List<ProduitDTO> allProduits = new ArrayList<>();
        allProduits.addAll(produitsEntreprise);
        allProduits.addAll(produitsParticulier);

        return allProduits;
    }


    @Override
    public Optional<ProduitEntrepriseDTO> getProduitEntrepriseById(Long id) {
        Optional<ProduitEntreprise> optionalProduitEntreprise = produitEntrepriseRepository.findById(id);
        return optionalProduitEntreprise.map(produit -> modelMapper.map(produit, ProduitEntrepriseDTO.class));
    }

    @Override
    public Optional<ProduitParticulierDTO> getProduitParticulierById(Long id) {
        Optional<ProduitParticulier> optionalProduitParticulier = produitParticulierRepository.findById(id);
        return optionalProduitParticulier.map(produit -> modelMapper.map(produit, ProduitParticulierDTO.class));
    }
}
