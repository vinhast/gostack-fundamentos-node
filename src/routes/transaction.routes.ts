import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();
const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();
    
    response.json({
      transactions,
      balance
    });
  } catch (err) {
    return response.status(400).json({ 
      error: err.message 
    });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    
    const createTransaction = new CreateTransactionService(
      transactionsRepository
    );

    const transition = createTransaction.execute({
      title,
      type,
      value
    });

    return response.json(transition);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
