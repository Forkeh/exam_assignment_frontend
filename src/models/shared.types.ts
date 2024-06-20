/* eslint-disable @typescript-eslint/no-unused-vars */
interface Product {
    id?: number;
    name: string;
    price: number;
    weightInGrams: number;
}

interface ProductOrder {
    id?: number;
    product: Product;
    quantity: number;
}
interface Delivery {
    id?: number;
    deliveryDate: string;
    fromWarehouse: string;
    destination: string;
    productOrders: ProductOrder[];
    totalWeightInKg: number;
}

interface Van {
    id: number;
    brand: string;
    model: string;
    capacityInKg: number;
    deliveries: Delivery[];
    combinedWeightOfDeliveriesInKg: number;
}
