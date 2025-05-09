import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addParking} from "../services/apiFacade";
import type { Parking } from "../services/apiFacade";
import RegistrationForm from "../forms/ParkingForm";


const EMPTY_PARKING: Parking = {
    id: null,
    pArea: "",
    plateNumber: "",
    startTime: "",
    endTime: "",
    userId: 0,
    userName: "",
    
}

export default function Parking() {
    const navigate = useNavigate();
    const [parking, setParking] = useState<Parking>({ ...EMPTY_PARKING });
    const [userId, setUserId] = useState<number | null>(null);
    const [userName, setUserName] = useState<string>("");

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        const storedUserName = localStorage.getItem("userName");

        if (storedUserId) {
            setUserId(Number(storedUserId));
        }

        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setParking({
            ...parking,
            [name]: ["userId"].includes(name) ? Number(value) : value,
        });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addParking({ ...parking, userId: userId!, userName: userName });
            alert("Parkering oprettet!");
            navigate("/home");
        } catch (error) {
            console.error("Fejl ved oprettelse:", error);
            alert("Kunne ikke oprette parkering.");
        }
    };

    return (
        <div>
        <RegistrationForm parking={parking} onChange={handleChange} onSubmit={handleSubmit} />
        </div>
    );

}
    
    