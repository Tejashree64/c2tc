
package com.tnsif.pm.certificate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CertificateController 
{
	@Autowired
	private CertificateService Service;
	
	//Restful API methods for retrieval operations
	
	@GetMapping("/certificates")
	public List<Certificate> list()
	{
		return Service.listAll();
	}
	
	@GetMapping("/certificates/{id}")

	public ResponseEntity<Certificate> get (@PathVariable Long id)

	{

	try

	{

	Certificate certificate = Service.get(id);

	return new ResponseEntity<Certificate>(certificate, HttpStatus.OK);

	}

	catch (NoSuchElementException e)

	{

	return new ResponseEntity<Certificate>(HttpStatus.NOT_FOUND);

	}

	}
	
	//create operation
	@PostMapping("/certificates")

	public void add (@RequestBody Certificate certificate)

	{

	Service.save(certificate);

	}
	
	
	// RESTful API method for Update operation

	@PutMapping("/products/{id}")

	public ResponseEntity<?> update (@RequestBody Certificate certificate, @PathVariable Long id)

	{

	try

		{
	
			Certificate existCertificate = Service.get(id);
		
			Service.save(existCertificate);
		
			return new ResponseEntity<>(HttpStatus.OK);
	
			}

	catch (NoSuchElementException e)
	
		{
	
	
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	// Restful API method for Delete operation

	@DeleteMapping("/certificate/{id}")

	public void delete (@PathVariable Long id)

	{

	Service.delete(id);

	}

}
