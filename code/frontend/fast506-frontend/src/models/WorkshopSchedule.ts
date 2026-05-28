export interface WorkshopSchedule {
  idAppointment?: number;
  numberReference: number;
  licensePlate: string;
  entryDate: string;
  reasonService: string;
  receptionMileage: number;
  idClient: number;
  idBranch: number;
  isActive?: boolean;
}