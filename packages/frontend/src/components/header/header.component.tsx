import ConnectWalletButton from "../connect-wallet-button/connect-wallet-button.tsx";

function Header() {
  return (
    <div className="flex items-center justify-between mb-9">
      <h2 className="font-bold text-2xl">crypto pay</h2>
      <ConnectWalletButton />
    </div>
  );
}

export default Header;
