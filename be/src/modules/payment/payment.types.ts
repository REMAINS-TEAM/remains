export interface CreatePaymentResponse {
  id: string;
  status: string;
  confirmation: { confirmation_token: string };
}

export interface PaymentProvider {
  createPayment: (amount: number) => Promise<CreatePaymentResponse>;
}
