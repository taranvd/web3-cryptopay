import "./App.css";
import Header from "./components/header/header.component.tsx";
import Balance from "./components/balance/balance.tsx";
import RecentActivity from "./components/recent-activity/recent-activity.component.tsx";
import AccountDetails from "./components/account-details/account-details.component.tsx";
import RequestAndPay from "./components/request-and-pay/request-and-pay.tsx";

function App() {
  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4">
        <Header />

        <div className="flex justify-center gap-10">
          <div>
            <Balance />
            <RequestAndPay />
            <AccountDetails />
          </div>

          <RecentActivity />
        </div>
      </div>
    </>
  );
}

export default App;
