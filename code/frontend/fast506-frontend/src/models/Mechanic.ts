export interface Mechanic {

    idUser: number;
    name: string;
    id: number;
    email: string;
    password: string;
    phoneNumber: string;
    dateBirth: Date;
    profileImage: string;
    isActive: boolean;
    employeeId: string;
    corporateEmail: string;
    role: { idRole: number };
    specialty: string;
    certLevel: string;

}