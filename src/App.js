import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListCertificateComponent from './components/ListCertificateComponent';
import AddCertificateComponent from './components/AddCertificateComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';


function App() {
    return (
        <div>
            <Router>
                <HeaderComponent />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<ListCertificateComponent />} />
                        <Route path="/certificates" element={<ListCertificateComponent />} />
                        <Route path="/add-certificate" element={<AddCertificateComponent />} />
                        <Route path="/edit-certificate/:id" element={<AddCertificateComponent />} />
                    </Routes>
                </div>
                <FooterComponent />
            </Router>
        </div>
    );
}

export default App;
