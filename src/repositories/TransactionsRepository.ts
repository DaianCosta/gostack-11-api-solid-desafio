import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface TransactionsDTO {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): TransactionsDTO {
    const transactions: TransactionsDTO = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
    return transactions;
  }

  private sumIncome(): number {
    return this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((sum, transaction) => {
        return sum + transaction.value;
      }, 0);
  }

  private sumOutcome(): number {
    return this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((sum, transaction) => {
        return sum + transaction.value;
      }, 0);
  }

  private calcTotal(): number {
    return this.sumIncome() - this.sumOutcome();
  }

  public getBalance(): Balance {
    const balance: Balance = {
      income: this.sumIncome(),
      outcome: this.sumOutcome(),
      total: this.calcTotal(),
    };

    return balance;
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
