export interface BankDetails {
  bank_name: string;
  acc_no: number;
  ifsc_code: number;
}
export interface PaymentDetails {
  card_type: string;
  card_number: number;
  expiry: string;
  cvv: number;
}
export interface User {
  _id: string;
  role: string;
  name: string;
  email: string;
  phone: number;
  description: string;
  bank_details: BankDetails;
  payment_details?: PaymentDetails;
  crops_subscribed?: string[];
}
