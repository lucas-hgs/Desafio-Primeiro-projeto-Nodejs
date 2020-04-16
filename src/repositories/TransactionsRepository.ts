import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.getSum('income');

    const outcome = this.getSum('outcome');

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  private getSum(type: string): number {
    return this.transactions.reduce((sum, element) => {
      if (element.type === type) {
        return sum + element.value;
      }
      return sum;
    }, 0);
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
