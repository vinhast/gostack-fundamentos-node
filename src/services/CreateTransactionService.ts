import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request{
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: Request): Transaction {
    if(!["income", "outcome"].includes(type)){
      throw new Error('Transaction is type invalid');
    }
    const { total } = this.transactionsRepository.getBalance();
    if(type === "outcome" && value > total){
      throw new Error ('Valor maior que o saldo disponível');
    }
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    });

    return transaction;
  }
}

export default CreateTransactionService;
