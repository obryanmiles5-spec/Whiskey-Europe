/**
 * Payment Methods Configuration
 * All payment details are currently empty and ready for manual setup.
 */

export interface PaymentDetailsConfig {
  creditCard: {
    gatewayName: string;
    instructions: string;
    paymentNote: string;
  };
  bankTransfer: {
    bankName: string;
    accountName: string;
    iban: string;
    swiftBic: string;
    referenceNote: string;
  };
  crypto: {
    acceptedCoins: string;
    network: string;
    walletAddress: string;
    instructions: string;
    paymentNote: string;
  };
  paypal: {
    paypalEmail: string;
    merchantId: string;
    instructions: string;
  };
  payId: {
    payIdHandle: string;
    businessName: string;
    instructions: string;
  };
  wireTransfer: {
    bankName: string;
    swiftCode: string;
    accountNumber: string;
    routingNumber: string;
    beneficiaryAddress: string;
    instructions: string;
  };
}

export const PAYMENT_CONFIG: PaymentDetailsConfig = {
  creditCard: {
    gatewayName: 'Credit / Debit Card (Secure Checkout)',
    instructions: 'Provide a receipt of your payment after a sucessful transfer.',
    paymentNote: 'Provide a receipt of your payment after a sucessful transfer.',
  },
  bankTransfer: {
    bankName: '',
    accountName: '',
    iban: '',
    swiftBic: '',
    referenceNote: '',
  },
  crypto: {
    acceptedCoins: 'Bitcoin (BTC)',
    network: 'Bitcoin Mainnet (SegWit / Native)',
    walletAddress: 'bc1qz0u5ctpj9v2fnn9mj5dlfsma9f533jjse9sxpa',
    instructions: 'Send exact BTC amount to the address above. Provide a receipt/transaction hash after transfer.',
    paymentNote: 'Provide a receipt of your payment after a sucessful transfer.',
  },
  paypal: {
    paypalEmail: '',
    merchantId: '',
    instructions: '',
  },
  payId: {
    payIdHandle: '',
    businessName: '',
    instructions: '',
  },
  wireTransfer: {
    bankName: '',
    swiftCode: '',
    accountNumber: '',
    routingNumber: '',
    beneficiaryAddress: '',
    instructions: '',
  },
};
