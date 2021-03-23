
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
    gasTankWhenIn?: number;
    mechanicPictures?: Array<string>;
    accesories?: Array<string>;
    carId?: string;
    inAppointment?: boolean;
}