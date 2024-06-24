/* package net.nak.Schedule;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import net.nak.services.AnnexeService;

@Component
public class ScheduledTasks {

    private final AnnexeService annexeService;

    public ScheduledTasks(AnnexeService annexeService) {
        this.annexeService = annexeService;
    }

    // Tâche planifiée pour générer le fichier quotidien à 17h tous les jours
    @Scheduled(cron = "0 0 11 * * *") // à 11h00 tous les jours
    public void generateDailyFile() {
        annexeService.generateDailyFile();
    }
} */