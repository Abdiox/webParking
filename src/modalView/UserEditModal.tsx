import { useState, useEffect } from "react";
import Modal from "./Modal";
import { editUser } from "../services/apiFacade";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import EditAnimation from "../components/animationer/EditAnimation.json";


const UserEditModal = ({ show, onClose, user }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
    const [editedUser, setEditedUser] = useState({
        id: null,
        email: "",
        phoneNumber: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        zipCode: ""
    });
    
    
    useEffect(() => {
        if (user) {
        setEditedUser({
            id: user.id,
            email: user.email || "",
            phoneNumber: user.phoneNumber || "",
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            address: user.address || "",
            city: user.city || "",
            zipCode: user.zipCode || ""
        });
        }
    }, [user]);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prev => ({
        ...prev,
        [name]: value
        }));
    };
    
    const handleSave = async () => {
        if (!editedUser) return;
        setIsLoading(true);
    
        try {
            await editUser(editedUser);
            setShowSuccessAnimation(true);
            
            setTimeout(() => {
                setShowSuccessAnimation(false);
                onClose();
                window.location.reload();
            }, 3000);
        } catch (error) {
            alert("Der skete en fejl: " + error);
            setIsLoading(false);
        }
    };
    
    const renderContent = () => {
        if (showSuccessAnimation) {
            return (
                <div className="edit-animation-container">
                    <Lottie 
                        animationData={EditAnimation} 
                        loop={false} 
                        autoplay={true}
                    />
                    <p className="edit-success-message">Brugeroplysninger opdateret!</p>
                </div>
            );
        }
        if (!user) {
            return <p>Ingen bruger at redigere.</p>;
        }
        return (
        <div className="edit-user-form">
    
            <label>
            Email:
            <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
            />
            </label>
            <label>
            Telefon:
            <input
                type="text"
                name="phoneNumber"
                value={editedUser.phoneNumber}
                onChange={handleInputChange}
            />
            </label>

            <label>
            Fornavn:
            <input
                type="text"
                name="firstName"
                value={editedUser.firstName}
                onChange={handleInputChange}
            />
            </label>
            <label>
            Efternavn:
            <input
                type="text"
                name="lastName"
                value={editedUser.lastName}
                onChange={handleInputChange}
            />
            </label>
            <label>
            Adresse:
            <input
                type="text"
                name="address"
                value={editedUser.address}
                onChange={handleInputChange}
            />
            </label>
            <label>
            By:
            <input
                type="text"
                name="city"
                value={editedUser.city}
                onChange={handleInputChange}
            />
            </label>
            <label>
            Postnummer:
            <input
                type="text"
                name="zipCode"
                value={editedUser.zipCode}
                onChange={handleInputChange}
            />
            </label>
        </div>
        );
    };
    
    const renderFooter = () => {
        return (
        <>
            <button 
            onClick={handleSave}
            disabled={isLoading}
            className="modal-button save"
            >
            {isLoading ? "Arbejder..." : "Gem ændringer"}
            </button>
            <button 
            onClick={onClose}
            disabled={isLoading}
            className="modal-button cancel"
            >
            Annuller
            </button>
        </>
        );
    }
    return (
        <Modal
        show={show}
        onClose={!isLoading && !showSuccessAnimation ? onClose : () => {}}
        title="Rediger brugeroplysninger"
        footer={showSuccessAnimation ? null : renderFooter()}
        >
        {renderContent()}
        </Modal>
    );
}
export default UserEditModal;