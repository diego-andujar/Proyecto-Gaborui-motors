import { Car } from './car';

export interface Roles {
    client?: boolean,
    manager?: boolean,
    admin?: boolean,
    mechanic?: boolean,
}

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
    cars?: Car[],
    rol?: Roles,
}