export interface Sales {
    idSales: number,
    invoiceNumber: number | null,
    transactionDate: Date | string,
    paymentMethod: string,
    basePrice: number,
    salesTax: number,
    extras: number,
    totalPayment: number,
    transferCost: number,       
    idClient: number,
    idAdmin: number,
    idCar: number,
    idCatalog: number,
    isActive: boolean | null
}