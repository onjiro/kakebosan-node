import useSWR from "swr";
import { format } from "date-fns";
import styles from "./index.module.scss";
import { Button, Col, Form, Row } from "react-bootstrap";

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
    <div className={styles.contentWrapper}>
      <section className={styles.content}>
        <h1 className={styles.title}>一覧</h1>
        <ul className={styles.transactionList}>
          {data &&
            data.map((trx: any) => (
              <li key={trx.id} className={styles.transaction}>
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
      </section>
      <section className={styles.rightDrawer}>
        <header className={styles.rightDrawerHeader}>
          <h2 className={styles.rightDrawerTitle}>入力</h2>
          <Button variant="outline-secondary">x</Button>
        </header>
        <section className={styles.rightDrawerContent}>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                金額
              </Form.Label>
              <Col sm="9">
                <Form.Control type="number" placeholder="0" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                支出科目
              </Form.Label>
              <Col sm="9">
                <Form.Select>
                  <option>-</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                日付
              </Form.Label>
              <Col sm="9">
                <Form.Control type="date" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                内容
              </Form.Label>
              <Col sm="9">
                <Form.Control type="text" placeholder="内容を入力" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                支出元
              </Form.Label>
              <Col sm="9">
                <Form.Select>
                  <option>-</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" size="lg">
                追加
              </Button>
            </div>
          </Form>
        </section>
      </section>
    </div>
  );
};
export default Home;
