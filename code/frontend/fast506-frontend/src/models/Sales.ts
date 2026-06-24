export interface Sales {
    idSales?: number,
    invoiceNumber: number | null,
    transactionDate: Date | string,
    paymentMethod: string,
    basePrice: number,
    salesTax: number,
    extras: number,
    totalPayment: number,
    transferCost: number, 
    salesStatus: string,      
    idClient: number,
    idAdmin: number | null,
    idCar: number,
    idCatalog: number,
    isActive: boolean | null
}