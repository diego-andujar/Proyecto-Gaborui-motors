import { Car } from './car';

export interface User {
    name: string,
    email: string,
    cedula?: string,
    phoneNumber?: string,
    address?: string[4],
    birthDate?: string,
    cars?: Car[],
    rol: string,
}