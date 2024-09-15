package com.tnsif.pm.certificate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stores")
@CrossOrigin(origins = "http://localhost:3000")  // Allow requests only from this origin
public class CertificateController {

    @Autowired
    private CertificateService service;
    
    // Restful API method for retrieval of all certificates
    @GetMapping("/certificates")
    public List<Certificate> list() {
        return service.listAll();
    }
    
    // Restful API method for retrieving a certificate by ID
    @GetMapping("/certificates/{id}")
    public ResponseEntity<Certificate> get(@PathVariable Long id) {
        try {
            Certificate certificate = service.get(id);
            return new ResponseEntity<>(certificate, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    // Restful API method for creating a new certificate
    @PostMapping("/certificates")
    public void add(@RequestBody Certificate certificate) {
        service.save(certificate);
    }
    
    // Restful API method for updating an existing certificate by ID
    @PutMapping("/certificates/{id}")
    public ResponseEntity<?> update(@RequestBody Certificate certificate, @PathVariable Long id) {
        try {
            Certificate existCertificate = service.get(id);
            if (existCertificate != null) {
                // Update the existing certificate with new data
                existCertificate.setCertificateName(certificate.getCertificateName());
                existCertificate.setIssuingOrganization(certificate.getIssuingOrganization());
                existCertificate.setIssueDate(certificate.getIssueDate());
                existCertificate.setStudentId(certificate.getStudentId());
                
                service.save(existCertificate);  // Save updated certificate
                return new ResponseEntity<>(HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    // Restful API method for deleting a certificate by ID
    @DeleteMapping("/certificates/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
