export interface Order {
  id: number;
  date: Date;
  status: string;
  total: number;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  orderItems: OrderItem[];
  itemCount: string;
}

export interface OrderItem {
  id: number;
  quantity: number;
  orderId: number;
  productId: number;
}
