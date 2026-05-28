/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cr.ac.ucr.ie.fast506.service;

import cr.ac.ucr.ie.fast506.domain.Branch;
import cr.ac.ucr.ie.fast506.domain.Catalog;
import cr.ac.ucr.ie.fast506.domain.Quotation;
import cr.ac.ucr.ie.fast506.domain.Testdrive;
import cr.ac.ucr.ie.fast506.domain.Unit;
import cr.ac.ucr.ie.fast506.domain.User;
import cr.ac.ucr.ie.fast506.repository.QuotationRepository;
import cr.ac.ucr.ie.fast506.repository.TestdriveRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.thymeleaf.context.Context;

/**
 *
 * @author ediso
 */
@Service
public class EmailService {

    @Autowired
    UserService userService;

    @Autowired
    UnitService unitService;

    @Autowired
    BranchService branchService;

    @Autowired
    QuotationRepository quotationRepository;
    
    @Autowired
    TestdriveRepository testdriveRepository;

    @Autowired
    private JavaMailSender mailSender; // El cartero que conecta con Gmail

    @Autowired
    private SpringTemplateEngine templateEngine; // El motor que procesa el HTML

    public void sendQuotation(Quotation quotation) throws MessagingException, Exception {
        Optional<User> userVerification = userService.findById(quotation.getIdUser());
        Optional<Unit> unitVerification = unitService.findById(quotation.getIdCar());

        if (userVerification.isPresent() && unitVerification.isPresent()) {
            User user = userVerification.get();
            Unit unit = unitVerification.get();

            int total = (int) quotationRepository.count();
            int month = quotation.getDate().getMonthValue();
            int day = quotation.getDate().getDayOfMonth();
            int combination = (total * 10000) + (day * 100) + month;
            quotation.setReferenceNumber(combination);

            Context context = new Context();// variables para el HTML
            context.setVariable("user", user);
            context.setVariable("unit", unit);
            context.setVariable("quotation", quotation);

            // busca en templates/email/quotation.html
            String htmlContent = templateEngine.process("email/quotation", context);

            MimeMessage message = mailSender.createMimeMessage();        //objeto de correo

            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(user.getEmail());
            helper.setSubject("Tu Cotización en Fast506");
            helper.setText(htmlContent, true); // true es HTML y no texto 

            mailSender.send(message);
        } else {
            throw new Exception("No se pudo encontrar datos necesarios para enviar el correo");
        }

    }

    public void sendTestdrive(Testdrive testdrive) throws MessagingException, Exception {
        Optional<User> userVerification = userService.findById(testdrive.getIdUser());
        Optional<Unit> unitVerification = unitService.findById(testdrive.getIdCar());
        Optional<Branch> branchVerification = branchService.findById(testdrive.getIdBranch());

        if (userVerification.isPresent() && unitVerification.isPresent() && branchVerification.isPresent()) {
            User user = userVerification.get();
            Unit unit = unitVerification.get();
            Branch branch = branchVerification.get();

        int total = (int) testdriveRepository.count();
        int month = testdrive.getScheduledDate().getMonthValue();
        int day = testdrive.getScheduledDate().getDayOfMonth();

        int combination = (total * 10000) + (day * 100) + month;

        testdrive.setNumberReference(combination);

            Context context = new Context();// variables para el HTML
            context.setVariable("user", user);
            context.setVariable("unit", unit);
            context.setVariable("branch", branch);
            context.setVariable("testdrive", testdrive);

            // busca en templates/email/quotation.html
            String htmlContent = templateEngine.process("email/testdrive", context);

            MimeMessage message = mailSender.createMimeMessage();        //objeto de correo

            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(user.getEmail());
            helper.setSubject("Tu Testdrive en Fast506");
            helper.setText(htmlContent, true); // true es HTML y no texto 

            mailSender.send(message);
        } else {
            throw new Exception("No se pudo encontrar datos necesarios para enviar el correo");
        }
    }

}
