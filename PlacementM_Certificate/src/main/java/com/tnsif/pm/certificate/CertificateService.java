package com.tnsif.pm.certificate;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class CertificateService 
{
	@Autowired
	private CertificateRepository repo;
	
	public List<Certificate> listAll()
	{
		return repo.findAll();
	}
	
	public Certificate get (Long id)

	{

	return repo.findById(id).get();
	}
	
	
	public void save(Certificate certificate) 
	{
		 repo.save(certificate);
	}
	
	public void delete (Long id)

	{

	repo.deleteById(id);

	}

}
