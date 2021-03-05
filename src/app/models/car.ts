import  firebase from 'firebase';

export interface Car {
    id?: string;
    owner?: firebase.User;
    brand?: string;
    model?: string;
    year?: number;
    plate?: string;
}