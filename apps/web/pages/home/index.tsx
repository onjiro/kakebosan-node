import useSWR from "swr";
import { format } from "date-fns";
import styles from "./index.module.scss";

const getAccountingItems = async () => {
  const res = await fetch("http://localhost:3002/accounting/transactions", {
    mode: "cors",
    credentials: "include",
  });
  return await res.json();
};

const dateFormat = (date: string) => format(new Date(date), "yyyy-MM-dd");
const debitEntries = (entries: any[]) =>
  entries.filter((entry) => entry.side_id === 1);
const creditEntries = (entries: any[]) =>
  entries.filter((entry) => entry.side_id === 2);
const totalAmount = (entries: any[]) =>
  entries.reduce((acc, entry) => acc + entry.amount, 0);
const entrisNamesFormat = (entries: any[]) =>
  entries.map((entry: any) => entry.item.name).join(", ");
const currencyFormat = (amount: number) => {
  const formatter = new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  });
  return formatter.format(amount);
};

const Home = () => {
  const { data, error } = useSWR("/accounting/items", getAccountingItems);
  if (error) {
    console.error(error);
  }

  return (
    <div>
      <h1 className={styles.title}>一覧</h1>
      <ul className={styles.transactionList}>
        {data &&
          data.map((trx: any) => (
            <li className={styles.transaction}>
              <span className={styles.date}>{dateFormat(trx.date)}</span>
              <span className={styles.debitItemNames}>
                {entrisNamesFormat(debitEntries(trx.entries))}
              </span>
              <span className={styles.creditItemNames}>
                {entrisNamesFormat(creditEntries(trx.entries))}
              </span>
              <span className={styles.amount}>
                {currencyFormat(totalAmount(debitEntries(trx.entries)))}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};
export default Home;
