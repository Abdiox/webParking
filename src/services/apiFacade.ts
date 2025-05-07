import { API_URL } from "../settings";
import { makeOptions, handleHttpErrors } from "./fetchUtils";
const USERS_URL = API_URL + "/user";
const USERSADD_URL = API_URL + "/user/add";
const PARKING_URL = API_URL + "./parking"



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

  export interface Parking {
    id: number | null;
    pArea: string;
    plateNumber: string
    startTime: Date;
    endTime: Date;
    User: UserDetails;
  }


  let users: Array<UserDetails> = [];
  let parking: Array<Parking> = [];


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
    if (parking.length > 0) return [...parking];
    try {
        const res = await fetch(PARKING_URL);
        if (!res.ok) {
            throw new Error("Failed to fetch users");
        }
        const data: Array<Parking> = await res.json();
        parking = data;
        return [...parking];
    } catch (error) {
        console.error(error);
        return [];
    }
  }

  
export { getUsers, getUser, addUser };