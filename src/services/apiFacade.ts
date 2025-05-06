import { API_URL } from "../settings";
import { makeOptions, handleHttpErrors } from "./fetchUtils";
const USERS_URL = API_URL + "/user";
const USERSADD_URL = API_URL + "/user/add";



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


  let users: Array<UserDetails> = [];



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



export { getUsers, getUser, addUser };