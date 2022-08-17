export interface PaymentProvider {
  createPayment: (amount: number, returnUrl: string) => any;
}
