import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export default function Web() {
  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col xs={8} className="bg-light pt-4 pb-4">
            <h1>家計簿さん</h1>
            <p>複式簿記で家計簿を！</p>
            <p>
              現金や電子マネー、クレジットカードなどの支払いと残高をまとめて管理できます。
            </p>
            <p>
              <Button
                href="http://localhost:3002/auth/github"
                variant="primary"
              >
                GitHubでログイン
              </Button>
            </p>
          </Col>
        </Row>
        <Row>
          <span>
            &copy;{" "}
            <a
              href="https://twitter.com/onjiro_mohyahya"
              target="_blank"
              rel="noreferrer"
            >
              @onjiro_mohyahya
            </a>{" "}
            2013-2023
          </span>
        </Row>
      </Container>
    </>
  );
}
