import { Token } from '@stripe/stripe-js';

export interface Order {
  name: string;
  amount: number;
  quantity: number;
  seller: string;
  sellerName: string;
  sellerPhone: string;
  sellerEmail: string;
  buyer: string;
  buyerName: string;
  buyerPhone: string;
  buyerEmail: string;
  productName: string;
  type: string;
  token?: Token;
}
