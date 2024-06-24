/* package net.nak.security;

import net.nak.entities.AnnulationTAM;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.repository.support.JobRepositoryFactoryBean;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.database.JdbcCursorItemReader;
import org.springframework.batch.item.file.FlatFileItemWriter;
import org.springframework.batch.item.file.transform.PassThroughLineAggregator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.FileSystemResource;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;

@Configuration
@EnableBatchProcessing
public class BatchConfiguration {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private PlatformTransactionManager transactionManager;

    @Bean
    public JobRepository jobRepository() throws Exception {
        JobRepositoryFactoryBean factory = new JobRepositoryFactoryBean();
        factory.setDataSource(dataSource);
        factory.setTransactionManager(transactionManager);
        factory.setDatabaseType("POSTGRES"); // or "H2" if using H2
        factory.afterPropertiesSet();
        return factory.getObject();
    }

    @Bean
    public Job myJob(JobRepository jobRepository, Step exportStep) {
        return new JobBuilder("myJob", jobRepository)
                .start(exportStep)
                .build();
    }

    @Bean
    public Step exportStep(JobRepository jobRepository) {
        return new StepBuilder("exportStep", jobRepository)
                .<AnnulationTAM, String>chunk(10, transactionManager)
                .reader(reader())
                .processor(processor())
                .writer(writer())
                .build();
    }

    @Bean
    public JdbcCursorItemReader<AnnulationTAM> reader() {
        JdbcCursorItemReader<AnnulationTAM> reader = new JdbcCursorItemReader<>();
        reader.setDataSource(dataSource);
        reader.setSql("SELECT * FROM annulation_tam");
        reader.setRowMapper(new BeanPropertyRowMapper<>(AnnulationTAM.class));
        return reader;
    }

    @Bean
    public ItemProcessor<AnnulationTAM, String> processor() {
        return annulationTAM -> {
            // Format: codeBq#nbreLigne#numeroAnnexe
            return annulationTAM.getCodeBq() + "#" + annulationTAM.getNbreLigne() + "#" +
                    annulationTAM.getNumeroAnnexe();
        };
    }

    @Bean
    public FlatFileItemWriter<String> writer() {
        FlatFileItemWriter<String> writer = new FlatFileItemWriter<>();
        writer.setResource(new FileSystemResource("C:/Repertoire-stock/FirstAnnexe.txt"));
        writer.setLineAggregator(new PassThroughLineAggregator<>());
        return writer;
    }
}
*/