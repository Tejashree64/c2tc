import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CertificateService from '../services/CertificateService';

const ListCertificateComponent = () => {
    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        getAllCertificates();
    }, []);

    const getAllCertificates = () => {
        CertificateService.getAllCertificates()
            .then((response) => {
                setCertificates(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the certificates!", error);
                alert("Failed to load certificates. Please try again.");
            });
    }

    const deleteCertificate = (certificateId) => {
        CertificateService.deleteCertificate(certificateId)
            .then(() => {
                getAllCertificates();  // Refresh the certificate list after deletion
            })
            .catch((error) => {
                console.error("There was an error deleting the certificate!", error);
                alert("Failed to delete certificate. Please try again.");
            });
    }

    return (
        <div className="container">
            <h2 className="text-center"> List Certificates </h2>
            <Link to="/add-certificate" className="btn btn-primary mb-2"> Add Certificate </Link>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Certificate Id</th>
                        <th>Certificate Name</th>
                        <th>Issuing Organization</th>
                        <th>Issue Date</th>
                        <th>Student ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {certificates.map((certificate) => (
                        <tr key={certificate.id}>
                            <td>{certificate.id}</td>
                            <td>{certificate.certificateName}</td>
                            <td>{certificate.issuingOrganization}</td>
                            <td>{certificate.issueDate}</td>
                            <td>{certificate.studentId}</td>
                            <td>
                                <Link className="btn btn-info" to={`/edit-certificate/${certificate.id}`}>Update</Link>
                                <button className="btn btn-danger" onClick={() => deleteCertificate(certificate.id)} style={{ marginLeft: "10px" }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListCertificateComponent;
