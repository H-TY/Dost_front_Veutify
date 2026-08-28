export interface Shopping {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;

  recipientName: string;
  phone: string;
  email: string;
  address: string;
  shippingMethod: string;
  paymentMethod: string;
  discount: number;
  shippingFee: number;
  totalPrice: number;
}

export type MiniCart = Pick<
  Shopping,
  "name" | "image" | "price" | "quantity" | "totalPrice"
>;
