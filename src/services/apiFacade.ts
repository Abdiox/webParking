import { API_URL } from "../settings";
import { makeOptions, handleHttpErrors } from "./fetchUtils";
const USERS_URL = API_URL + "/user";
const USERSADD_URL = API_URL + "/user/add";
const PARKING_URL = API_URL + "/parking";
const PARKINGADD_URL = API_URL + "/parking/add";
const PAREA_URL = API_URL + "/pArea";



export interface UserDetails {
    id: number | null;
    name: string;
    email: string;
    password: string;
    phoneNumber: number;
    rentalUnit: number;
    adress: string;
    city: string;
    zipCode: number;
  };

export interface Parea {
    id: number | null;
    areaName: string;
    city: string;
    postalCode: number;
    daysAllowedParking: number;
  }

  export interface Parking {
    id: number | null;
    parea: Parea; 
    plateNumber: string;
    startTime: string; 
    endTime: string;
    userId: number;      
  }
  


  let users: Array<UserDetails> = [];
  let parking: Array<Parking> = [];
  let parea: Array<Parea> = [];


  /* USERS */

async function getUsers(): Promise<Array<UserDetails>> {
  if (users.length > 0) return [...users];
  try {
      const res = await fetch(USERS_URL);
      if (!res.ok) {
          throw new Error("Failed to fetch users");
      }
      const data: Array<UserDetails> = await res.json();
      users = data;
      return [...users];
  } catch (error) {
      console.error(error);
      return [];
  }
}

async function getUser(id: number): Promise<UserDetails>{
    return fetch(USERS_URL + "/" + id)
    .then(handleHttpErrors)
}

async function addUser(newUser: UserDetails): Promise<UserDetails> {
    const method = newUser.id ? "PUT" : "POST";
    const options = makeOptions(method, newUser);
    const URL = newUser.id ? `${USERSADD_URL}/${newUser.id}` : USERSADD_URL;
    return fetch(URL, options).then(handleHttpErrors);
    }

  /* PARKING */
  async function getParkings(): Promise<Array<Parking>> {
    try {
      const res = await fetch(PARKING_URL);
      const data = await res.json();
      console.log("API response:", data);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  

  async function getParking(id: number): Promise<Parking>{
    return fetch(PARKING_URL + "/" + id)
    .then(handleHttpErrors)
}
async function addParking(newParking: Parking): Promise<Parking> {
    const method = newParking.id ? "PUT" : "POST";
    const options = makeOptions(method, newParking);
    const URL = newParking.id ? `${PARKINGADD_URL}/${newParking.id}` : PARKINGADD_URL;
    return fetch(URL, options).then(handleHttpErrors);
    }


async function getParea(): Promise<Array<Parea>> {
    try {
      const res = await fetch(PAREA_URL);
      const data = await res.json();
      console.log("API response:", data);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }


  
export { getUsers, getUser, addUser, getParkings, getParking, addParking, getParea, };