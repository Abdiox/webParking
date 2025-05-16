import React, { useState } from 'react';
import './ContactList.css';

export const ContactList: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccessMessage(true);
            
            setTimeout(() => {
                window.location.href = '/home';
            }, 2000);
        }, 1500);
    };

    return (
        <div className="contact-container">
            {showSuccessMessage ? (
                <div className="success-message">
                    <div className="success-icon">✓</div>
                    <h2>Tak for din besked!</h2>
                    <p>Din henvendelse er modtaget. Vi vender tilbage hurtigst muligt.</p>
                    <p className="redirecting">Omdirigerer til forsiden...</p>
                </div>
            ) : (
                <>
                    <h1 className="contact-title">Contact Us</h1>
                    <p className="contact-description">If you have any questions, feel free to reach out!</p>
                    
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="name">Name:</label>
                            <input 
                                className="form-input" 
                                type="text" 
                                id="name" 
                                name="name" 
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">Email:</label>
                            <input 
                                className="form-input" 
                                type="email" 
                                id="email" 
                                name="email" 
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label className="form-label" htmlFor="message">Message:</label>
                            <textarea 
                                className="form-textarea" 
                                id="message" 
                                name="message" 
                                required
                            />
                        </div>
                        
                        <button 
                            className={`submit-button ${isSubmitting ? 'submitting' : ''}`} 
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sender...' : 'Submit'}
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};
