export interface Quotation {
    idQuotation: number;
    referenceNumber: number;
    date: string;
    initialPrice: number;
    transferCost: number;
    salesTax: number;
    totalPayment: number;
    isActive: number;
    idUser: number;
    idCatalog: number;
    idCar: number;
}