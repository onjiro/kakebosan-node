import type { AppProps, AppType } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import { trpc } from "../utils/trpc";

const KakebosanApp: AppType = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default trpc.withTRPC(KakebosanApp);
