import { Car } from './car';
import { Roles } from "./roles"

export interface User {
    id?: string,
    name?: string,
    email?: string,
    cedula?: number,
    phoneNumber?: string,
    photoUrl?: string,
    address?: string,
    city?: string,
    state?: string,
    postalCode?: number,
    birthDate?: string,
    rol?: Roles,
    genero?: string,
    refId?: string,
}