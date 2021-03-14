import { Car } from './car';
import { Roles } from "./roles"

export interface User {
    id?: string,
    name?: string,
    email?: string,
    cedula?: string,
    phoneNumber?: string,
    photoUrl?: string,
    address?: string,
    city?: string,
    state?: string,
    postalCode?: string,
    birthDate?: string,
    rol?: Roles,
}