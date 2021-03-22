import { useTransactions } from '../../hooks/useTransactions';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';

import { Container } from "./styles";

export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') {
      acc.deposits += transaction.amount;
    } else {
      acc.withdraws += transaction.amount
    }

    return acc;
  }, {
    deposits: 0, 
    withdraws: 0,
  })

  return(
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="entradas"/>
        </header>
        <strong>
          {
            new Intl.NumberFormat('pt-BR', {
              currency: 'BRL',
              style: 'currency'
            }).format(summary.deposits)
          }
        </strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="entradas"/>
        </header>
        <strong>-
          {
            new Intl.NumberFormat('pt-BR', {
              currency: 'BRL',
              style: 'currency',
            }).format(summary.withdraws)
          }
        </strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="entradas"/>
        </header>
        <strong>
          {
            new Intl.NumberFormat('pt-BR', {
              currency: 'BRL',
              style: 'currency',
            }).format(summary.deposits - summary.withdraws)
          }
        </strong>
      </div>
    </Container>
  );
}