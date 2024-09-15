import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CertificateService from '../services/CertificateService';

const AddCertificateComponent = () => {
    const [certificateName, setCertificateName] = useState('');
    const [issuingOrganization, setIssuingOrganization] = useState('');
    const [issueDate, setIssueDate] = useState('');
    const [studentId, setStudentId] = useState('');
    const [message, setMessage] = useState('');  // For success/error messages
    const [error, setError] = useState('');
    const { id } = useParams();  // Get the certificate ID from the URL parameters

    useEffect(() => {
        if (id) {
            CertificateService.getCertificateById(id).then((response) => {
                setCertificateName(response.data.certificateName);
                setIssuingOrganization(response.data.issuingOrganization);
                setIssueDate(response.data.issueDate);
                setStudentId(response.data.studentId);
            }).catch(error => {
                console.error('Error fetching certificate:', error);
                setError('Error fetching certificate details.');
            });
        }
    }, [id]);

    const saveOrUpdateCertificate = (e) => {
        e.preventDefault();
        const certificate = { certificateName, issuingOrganization, issueDate, studentId };

        if (id) {
            // Update certificate
            CertificateService.updateCertificate(id, certificate)
                .then(() => setMessage('Certificate updated successfully.'))
                .catch(error => {
                    console.error('Error updating certificate:', error);
                    setError('Failed to update certificate. Please try again.');
                });
        } else {
            // Create new certificate
            CertificateService.createCertificate(certificate)
                .then(() => setMessage('Certificate created successfully.'))
                .catch(error => {
                    console.error('Error creating certificate:', error);
                    setError('Failed to create certificate. Please try again.');
                });
        }
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h2 className="text-center">{id ? 'Update Certificate' : 'Add Certificate'}</h2>
                        <div className="card-body">
                            <form onSubmit={saveOrUpdateCertificate}>
                                <div className="form-group mb-2">
                                    <label className="form-label">Certificate Name:</label>
                                    <input
                                        type="text"
                                        placeholder="Enter certificate name"
                                        className="form-control"
                                        value={certificateName}
                                        onChange={(e) => setCertificateName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label">Issuing Organization:</label>
                                    <input
                                        type="text"
                                        placeholder="Enter issuing organization"
                                        className="form-control"
                                        value={issuingOrganization}
                                        onChange={(e) => setIssuingOrganization(e.target.value)}
                                    />
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label">Issue Date:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={issueDate}
                                        onChange={(e) => setIssueDate(e.target.value)}
                                    />
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label">Student ID:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={studentId}
                                        onChange={(e) => setStudentId(e.target.value)}
                                    />
                                </div>

                                <button className="btn btn-success" type="submit">
                                    Submit
                                </button>
                                <button type="button" className="btn btn-danger" onClick={() => setMessage('')}>
                                    Cancel
                                </button>
                            </form>

                            {/* Display success or error messages */}
                            {message && <div className="alert alert-success mt-2">{message}</div>}
                            {error && <div className="alert alert-danger mt-2">{error}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddCertificateComponent;
