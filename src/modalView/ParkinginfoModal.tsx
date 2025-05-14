import React from "react";
import Modal from "./modal"

interface ParkingArea {
  areaName: string;
  city: string;
  daysAllowedParking: number;
  id: number;
  postalCode: number;
}

interface ParkingInfoModalProps {
  show: boolean;
  onClose: () => void;
  parkingArea: ParkingArea | undefined;
}

const ParkingInfoModal: React.FC<ParkingInfoModalProps> = ({ 
  show, 
  onClose, 
  parkingArea 
}) => {
  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Parkeringsområde Detaljer"
    >
      {parkingArea ? (
        <>
          <div className="modal-info-row">
            <span className="modal-info-label">Område:</span>
            <span className="modal-info-value">{parkingArea.areaName}</span>
          </div>
          <div className="modal-info-row">
            <span className="modal-info-label">By:</span>
            <span className="modal-info-value">{parkingArea.city}</span>
          </div>
          <div className="modal-info-row">
            <span className="modal-info-label">Postnummer:</span>
            <span className="modal-info-value">{parkingArea.postalCode}</span>
          </div>
          <div className="modal-info-row highlight">
            <span className="modal-info-label">Tilladte parkeringsdage:</span>
            <span className="modal-info-value">Maks: {parkingArea.daysAllowedParking} dage</span>
          </div>
        </>
      ) : (
        <p>Ingen information tilgængelig om dette parkeringsområde.</p>
      )}
    </Modal>
  );
};

export default ParkingInfoModal;