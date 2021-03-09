import { Car } from './car';

export interface User {
    id?: string,
    name?: string,
    email?: string,
    cedula?: string,
    phoneNumber?: string,
    address?: string,
    city?: string,
    state?: string,
    postalCode?: string,
    birthDate?: string,
    cars?: Car[],
    rol?: string,
}