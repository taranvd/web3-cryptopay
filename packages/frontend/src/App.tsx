import "./App.css";
import Header from "./components/header/header.component.tsx";
import Balance from "./components/balance/balance.tsx";
import RecentActivity from "./components/recent-activity/recent-activity.component.tsx";
import AccountDetails from "./components/account-details/account-details.component.tsx";
import RequestAndPay from "./components/request-and-pay/request-and-pay.tsx";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useUserStore } from "./storage/user.storage.ts";
import { AiFillWallet } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";

function App() {
  const { address, isConnected } = useAccount();
  const getUserData = useUserStore((state) => state.getUserData);
  const isLoading = useUserStore((state) => state.isLoading);
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    if (isConnected && address) {
      getUserData();
    }
  }, [isConnected, address]);

  return (
    <>
      {showMessage && (
        <div className="bg-red-700 absolute top-0 left-0 w-full h-[20px] flex justify-between items-center px-4">
          <p className="text-white text-sm">
            This is a demo project. The first request may take longer as it's
            using a free server on Render.com.
          </p>
          <AiFillCloseCircle
            size={15}
            className="text-white cursor-pointer"
            onClick={() => setShowMessage(false)}
          />
        </div>
      )}

      <div className="max-w-screen-xl mx-auto px-4">
        <Header />

        {isLoading && !isConnected && (
          <div className="flex items-center justify-center w-full h-screen">
            <div className="loader"></div>
          </div>
        )}

        {/* Main Content */}
        {!isLoading && isConnected ? (
          <div className="flex justify-center gap-10">
            <div>
              <Balance />
              <RequestAndPay />
              <AccountDetails />
            </div>

            <RecentActivity />
          </div>
        ) : (
          <div className="h-screen flex items-center justify-center gap-5">
            <AiFillWallet size={96} />
            <h1>Please connect your wallet</h1>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
