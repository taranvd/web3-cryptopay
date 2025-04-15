import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { configureChains, mainnet, WagmiConfig, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { sepolia } from "@wagmi/chains";

const { provider, webSocketProvider } = configureChains(
  [mainnet, sepolia],
  [publicProvider()],
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WagmiConfig client={client}>
      <App />
    </WagmiConfig>
  </StrictMode>,
);
