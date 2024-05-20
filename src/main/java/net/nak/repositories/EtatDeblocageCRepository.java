package net.nak.repositories;

import net.nak.entities.EtatDeblocageCredit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EtatDeblocageCRepository extends JpaRepository<EtatDeblocageCredit, Long> {
}
