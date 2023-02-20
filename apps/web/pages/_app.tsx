import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";

export default function KakebosanApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
