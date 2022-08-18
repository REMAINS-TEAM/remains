export interface Amount {
  value: string;
  currency: string;
}

export interface ThreeDSecure {
  applied: boolean;
}

export interface AuthorizationDetails {
  rrn: string;
  auth_code: string;
  three_d_secure: ThreeDSecure;
}

export interface Metadata {
  orderId: string;
}

export interface Card {
  first6: string;
  last4: string;
  expiry_month: string;
  expiry_year: string;
  card_type: string;
  issuer_country: string;
  issuer_name: string;
}

export interface PaymentMethod {
  type: string;
  id: string;
  saved: boolean;
  card: Card;
  title: string;
}

export interface Object {
  id: string;
  status: string;
  paid: boolean;
  amount: Amount;
  authorization_details: AuthorizationDetails;
  created_at: Date;
  description: string;
  expires_at: Date;
  metadata: Metadata;
  payment_method: PaymentMethod;
  refundable: boolean;
  test: boolean;
}

export interface YookassaWebhookDto {
  type: EventType;
  event: string;
  object: Object;
}

export enum EventType {
  WAITING_FOR_CAPTURE = 'payment.waiting_for_capture',
  PAYMENT_SUCCEEDED = 'payment.succeeded',
  PAYMENT_CANCELED = 'payment.canceled',
  REFUND_SUCCEEDED = 'refund.succeeded',
}
