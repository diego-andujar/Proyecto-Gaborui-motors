import { Car } from './car';

export interface Appointment {
    date?: string;
    dateCreated?: string;
    dateEnded?: string;
    car?: string;
    userid?: string;
    estado?: string; //si esta enviada, por confirmar o confirmada
    orderOpen?: boolean;
    qrCode?: string;
    diagnosis?: string;
    appId?: string;
    carInfo?: string;
    userName?: string;
    carPhoto?: string;
}