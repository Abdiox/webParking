import { API_URL } from "../settings";
import { makeOptions, handleHttpErrors } from "./fetchUtils";
const USERS_URL = API_URL + "/user";
const PARKING_URL = API_URL + "/parking";
const PAREA_URL = API_URL + "/pArea";
const CARS_URL = API_URL + "/cars";


type Roles = "PVAGT" | "ADMIN" | "USER";


export interface UserDetails {
    id: number | null;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: number;
    rentalUnit: number;
    adress: string;
    city: string;
    zipCode: number;
    role: Roles | null;
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
  

export interface Car {
    id: number | null;
    registrationNumber: string | null;
    make: string | null;
    model: string | null;
    modelYear: number | null;
    color: string | null;
    type: string | null;
    total_weight: number;
    description: string| null;
    userId: number | null;

  }



  let users: Array<UserDetails> = [];
  let parking: Array<Parking> = [];
  let parea: Array<Parea> = [];
  let cars: Array<Car> = [];


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

async function addUser(user: UserDetails): Promise<UserDetails> {
  const options = makeOptions("POST", user);
  return fetch(USERS_URL + "/add", options).then(handleHttpErrors);
}

async function getUser(id: number): Promise<UserDetails> {
  return fetch(USERS_URL + "/" + id)
  .then(handleHttpErrors)
}
async function editUser(user: UserDetails): Promise<UserDetails> {
  const options = makeOptions("PUT", user);
  return fetch(USERS_URL + "/" + user.id, options).then(handleHttpErrors);
}

async function deleteUser(id: number): Promise<void> {
  console.log("Deleting user with ID:", id);
  const options = makeOptions("DELETE", null);

  const response = await fetch(USERS_URL + "/" + id, options);
   console.log("Response from deleteUser:", response);
   
  if (!response.ok) {
    throw new Error(`Failed to delete user with status: ${response.status}`);
  }
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

 async function addParking(parking: Parking): Promise<Parking> {
  const options = makeOptions("POST", parking);
  return fetch(PARKING_URL + "/add", options).then(handleHttpErrors);
}

export async function getUserParkings(userId: number): Promise<Array<Parking>> {
  return fetch(PARKING_URL + "/user/" + userId).then(handleHttpErrors);
}

async function editParking(parking: Parking): Promise<Parking> {
  const options = makeOptions("PUT", parking);
  return fetch(PARKING_URL + "/" + parking.id, options).then(handleHttpErrors);
}

async function deleteParking(id: number): Promise<void> {
  console.log("Deleting parking with ID:", id);
  const options = makeOptions("DELETE", null);
  
  const response = await fetch(PARKING_URL + "/" + id, options);
   console.log("Response from deleteParking:", response);
   
  if (!response.ok) {
    throw new Error(`Failed to delete parking with status: ${response.status}`);
  }
}
  

      /** P-Area **/


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

async function getPareaById(id: number): Promise<Parea> {
    return fetch(PAREA_URL + "/" + id)
    .then(handleHttpErrors)

}

async function addParea(parea: Parea): Promise<Parea> {
    const options = makeOptions("POST", parea);
    return fetch(PAREA_URL + "/add", options).then(handleHttpErrors);
}

async function editParea(parea: Parea): Promise<Parea> {
    const options = makeOptions("PUT", parea);
    return fetch(PAREA_URL + "/" + parea.id, options).then(handleHttpErrors);
}

async function deleteParea(id: number): Promise<void> {
    console.log("Deleting Parea with ID:", id);
    const options = makeOptions("DELETE", null);
    
    const response = await fetch(PAREA_URL + "/" + id, options);
     console.log("Response from deleteParea:", response);
     
    if (!response.ok) {
      throw new Error(`Failed to delete Parea with status: ${response.status}`);
    }
  }


        /** Cars **/
        
async function getCars(): Promise<Array<Car>> {
    try {
      const res = await fetch(CARS_URL);
      const data = await res.json();
      console.log("API response:", data);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

async function getCar(id: number): Promise<Car> {
    return fetch(CARS_URL + "/" + id)
    .then(handleHttpErrors)

}



async function getCarsByUserId(userId: number): Promise<Car[]> {
  return fetch(CARS_URL + "/user/" + userId)
  .then(handleHttpErrors)
}

async function addCar(car: Car): Promise<Car> {
    const options = makeOptions("POST", car);
    return fetch(CARS_URL + "/add", options).then(handleHttpErrors);
}

async function editCar(car: Car): Promise<Car> {
    const options = makeOptions("PUT", car);
    return fetch(CARS_URL + "/" + car.id, options).then(handleHttpErrors);
}

async function deleteCar(id: number): Promise<void> {
    console.log("Deleting Car with ID:", id);
    const options = makeOptions("DELETE", null);
    
    const response = await fetch(CARS_URL + "/" + id, options);
     console.log("Response from deleteCar:", response);
     
    if (!response.ok) {
      throw new Error(`Failed to delete Car with status: ${response.status}`);
    }
  }

  export async function getCarFromNumberplate(plateNumber: string): Promise<Car> {
    const options = {
        method: "GET",
        headers: {
            "X-AUTH-TOKEN": "unq3bj96qz7umcabu3qtfqnu2okjsadn",
            
        },
    };
    return fetch('https://v1.motorapi.dk/vehicles/' + plateNumber, options).then(handleHttpErrors);
}

  
export { getUsers, getUser, addUser, editUser, deleteUser, getParkings, getParking, editParking, deleteParking, addParking, getParea, getPareaById, addParea, editParea, deleteParea, getCars, getCar, getCarsByUserId, addCar, editCar, deleteCar };