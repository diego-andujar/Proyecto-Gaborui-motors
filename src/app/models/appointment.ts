import { Car } from './car';

export interface Appointment {
    date?: string;
    car?: Car;
    userid?: string;
    estado?: string; //si esta enviada, por confirmar o confirmada
    qrCode?: string;
    diagnosis?: string;
}