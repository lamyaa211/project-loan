package net.nak.services;

import net.nak.DTO.*;
import net.nak.entities.Annexe;
import net.nak.repositories.AnnexeRepository;
import org.modelmapper.ModelMapper;
import org.reflections.Reflections;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
@Service
public class AnnexeServiceImpl implements AnnexeService{


        private final AnnexeRepository annexeRepository;
        private final ModelMapper modelMapper;

        public AnnexeServiceImpl(AnnexeRepository annexeRepository ,ModelMapper modelMapper) {
            this.annexeRepository = annexeRepository;
            this.modelMapper = modelMapper;
        }

        @Override
        public AnnexeDTO addAnnexe(AnnexeDTO annexeDTO) {
            Annexe annexe = modelMapper.map(annexeDTO, Annexe.class);
            Annexe savedAnnexe = annexeRepository.save(annexe);
            return modelMapper.map(savedAnnexe, AnnexeDTO.class);
        }

        @Override
        public AnnexeDTO updateAnnexe(Long id, AnnexeDTO annexeDTO) {
            Annexe existingAnnexe = annexeRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Annexe not found with id: " + id));
            modelMapper.map(annexeDTO, existingAnnexe);
            Annexe updatedAnnexe = annexeRepository.save(existingAnnexe);
            return modelMapper.map(updatedAnnexe, AnnexeDTO.class);
        }

        @Override
        public AnnexeDTO getAnnexeById(Long id) {
            Annexe annexe = annexeRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Annexe not found with id: " + id));
            return modelMapper.map(annexe, AnnexeDTO.class);
        }

        @Override
        public List<AnnexeDTO> getAllAnnexe() {
            List<Annexe> allAnnexe = annexeRepository.findAll();
            return allAnnexe.stream()
                    .map(annexe -> modelMapper.map(annexe, AnnexeDTO.class))
                    .collect(Collectors.toList());
        }


    @Override
    public List<String> getAllAnnexeTypes() {
        List<String> allAnnexeTypes = new ArrayList<>();
        Reflections reflections = new Reflections("net.nak.DTO");
        Set<Class<? extends AnnexeDTO>> subTypes = reflections.getSubTypesOf(AnnexeDTO.class);
        for (Class<? extends AnnexeDTO> subType : subTypes) {
            allAnnexeTypes.add(subType.getSimpleName());
        }
        return allAnnexeTypes;
    }




}
