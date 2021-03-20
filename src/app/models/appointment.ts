import { Car } from './car';

export interface Appointment {
    date?: string;
    dateCreated?: string;
    car?: string;
    userid?: string;
    estado?: string; //si esta enviada, por confirmar o confirmada
    qrCode?: string;
    diagnosis?: string;
    appId?: string;
}