export interface RepairReport {
  idReparation?: number;
  numberReference: number;
  technicalDiagnosis?: string;
  spareParts?: string;
  observations?: string;
  cost: number;
  taxes: number;
  totalPayment: number;
  completionDate: string;
  idMechanic: number;
  idAppointment: number;
  isActive?: boolean;
}