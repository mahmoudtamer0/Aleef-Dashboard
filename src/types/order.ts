


export interface OrderItem {
    _id: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
}
export interface Order {
    _id: string;
    user: { _id: string; name: string; email: string } | null;
    shippingAddress: { address: string; city: string; phone: string };
    paymentMethod: "cash" | "card";
    status: "pending" | "shipped" | "delivered" | "cancelled";
    totalOrder: number;
    subTotal: number;
    delivery: number;
    taxPayed: number;
    createdAt: string;
    items: OrderItem[];
    updatedAt: string;
}