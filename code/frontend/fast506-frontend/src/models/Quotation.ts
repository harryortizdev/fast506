export interface Quotation {
    idQuotation: number;
    referenceNumber: number;
    date: Date;
    initialPrice: number;
    transferCost: number;
    salesTax: number;
    totalPayment: number;
    isActive: boolean;
    idUser: number;
    idCatalog: number;
    idCar: number;
}