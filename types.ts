
export enum AccountType {
  SAVINGS = 'Savings',
  CURRENT = 'Current',
  FIXED_DEPOSIT = 'Fixed Deposit',
}

export interface PersonalDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

export interface KycDocument {
  documentType: string;
  file: File | null;
}

export interface AccountDetails {
  accountType: AccountType;
  initialDeposit: number;
}

export interface FormData {
  personalDetails: PersonalDetails;
  kycDocument: KycDocument;
  accountDetails: AccountDetails;
}
