export interface Client {

    idUser: number;
    id: number;
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    dateBirth: Date;
    profileImage: string;
    isActive: boolean;
    role: { idRole: number };
    commInterest: string;
    physicalAddress: string;
    occupation: string;

}