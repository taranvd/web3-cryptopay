import ConnectWalletButton from "../connect-wallet-button/connect-wallet-button.tsx";
import { MessageOutlined } from "@ant-design/icons";

function Header() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <MessageOutlined style={{ fontSize: "25px", color: "#08c" }} />
        <h2 className="font-bold text-xl">crypto pay</h2>
      </div>
      <ConnectWalletButton />
    </div>
  );
}

export default Header;
