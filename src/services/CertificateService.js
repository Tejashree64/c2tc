import axios from 'axios';

const API_URL = 'http://localhost:8080/api/stores/certificates';

const getAllCertificates = () => {
  return axios.get(API_URL);
};

const getCertificateById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

const createCertificate = (certificate) => {
  return axios.post(API_URL, certificate);
};

const updateCertificate = (id, certificate) => {
  return axios.put(`${API_URL}/${id}`, certificate);
};

const deleteCertificate = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export default {
  getAllCertificates,
  getCertificateById,
  createCertificate,
  updateCertificate,
  deleteCertificate,
};
