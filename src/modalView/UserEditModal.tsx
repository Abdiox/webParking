import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { editUser, getUser } from "../services/apiFacade";
import { useNavigate } from "react-router-dom";
import "./UserEditModal.css";


const UserEditModal = ({ show, onClose, user }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [editedUser, setEditedUser] = useState({
        id: null,
        email: "",
        phone: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        zipCode: ""
    });
    
    const navigate = useNavigate();
    
    useEffect(() => {
        if (user) {
        setEditedUser({
            id: user.id,
            email: user.email || "",
            phone: user.phoneNumber || "",
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            address: user.adress || "",
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
        alert("Brugeroplysninger opdateret!");
        window.location.reload();
        navigate("/my-profile");
        onClose();
        } catch (error) {
        alert("Der skete en fejl: " + error);
        } finally {
        setIsLoading(false);
        }
    };
    
    const renderContent = () => {
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
                name="phone"
                value={editedUser.phone}
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
        onClose={!isLoading ? onClose : () => {}}
        title="Rediger brugeroplysninger"
        footer={renderFooter()}
        >
        {renderContent()}
        </Modal>
    );
}
export default UserEditModal;