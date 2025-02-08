type Account = {
    id: number;
    userId: number;
    balance: string;
    active_investment: number;
    total_withdrawal: number;
    total_earnings: number,
    affliate_commision: number
  };
  
  export type User = {
    account: Account;
    active: boolean;
    country: string;
    createdAt: string;
    email: string;
    emailVerified: boolean;
    referredBy: User,
    fullname: string;
    id: number;
    investments: []; // You can replace `any` with a more specific type if needed
    phone: string;
    referred_id: number | null;
    transactions: any[]; // Replace `any` if you have a defined transaction type
  };