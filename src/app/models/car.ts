import { Accesorie } from "../components/car-form/car-form.component";

export interface Car {
    brand?: string;
    model?: string;
    year?: number;
    plate?: string;
    userid?: string;
    photo?: string;
    serialMotor?: string;
    registerDate?: string;
    active?: boolean;
    color?: string;
    kmWhenIn?: number;
    gasTankWhenIn?: string;
    mechanicPictures?: Array<any>;
    accesories?: Array<Accesorie>;
    carId?: string;
    inAppointment?: boolean;
}