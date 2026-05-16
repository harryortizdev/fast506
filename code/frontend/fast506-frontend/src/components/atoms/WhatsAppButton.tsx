import React from "react";

const WhatsAppButton = () => {
    return (
        <div>
            <a href="https://wa.me/50661186130" className="btn-whatsapp" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-whatsapp"></i>
            </a>
            <style>{`
                .btn-whatsapp {
                    position: fixed;
                    width: 60px;
                    height: 60px;
                    bottom: 40px;
                    right: 40px;
                    background-color: #25d366;
                    color: #FFF;
                    border-radius: 50px;
                    text-align: center;
                    font-size: 35px;
                    box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    text-decoration: none;
                }
                .btn-whatsapp:hover {
                    background-color: #128c7e;
                    transform: scale(1.1);
                    color: white;
                }
            `}</style>
        </div>
    );
};

export default WhatsAppButton;