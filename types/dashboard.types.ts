export interface DashboardResponse {
    message: string;
    data: DashboardResponseData;
}

export interface DashboardResponseData {
  saldo: number;
  totalIncome: number;
  totalExpense: number;
  totalTransaction: number;
  monthlyExpense: DashboardResponseMonthlyExpense[];
  wallets: DashboardResponseWallet[];
}

export interface DashboardResponseWallet {
  id: string;
  name: string;
  type: string;
  balance: number;
  income: number;
  expense: number;
  transactionCount: number;
}

export interface DashboardResponseMonthlyExpense {
  month: number;
  total: number;
}
