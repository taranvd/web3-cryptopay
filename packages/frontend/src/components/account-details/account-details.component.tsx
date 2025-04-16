// @ts-nocheck
import React from "react";
import { Card, Input, message, Modal } from "antd";
import { FaEthereum } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { useUserStore } from "../../storage/user.storage.ts";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { shortenAddress } from "../../utils/shorten-address.util.ts";
import { ethers } from "ethers";
import { sepolia } from "@wagmi/chains";
import ABI from "../../assets/abi.json";

function AccountDetails() {
  const [nameModal, setNameModal] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const balance = useUserStore((state) => state.balance);
  const name = useUserStore((state) => state.name);
  const getUser = useUserStore((state) => state.getUserData);
  const { address } = useAccount();

  const { config } = usePrepareContractWrite({
    chainId: sepolia.id,
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "addName",
    args: [username],
    overrides: {
      value: 0,
    },
  });

  const { write, data } = useContractWrite(config);

  const { isSuccess, isLoading, isFetching } = useWaitForTransaction({
    hash: data?.hash,
  });

  React.useEffect(() => {
    if (isLoading || isFetching) {
      message.loading({ content: "Processing...", key: "loading" });
    }

    if (isSuccess) {
      message.success({
        content: "Username set successfully",
        key: "success",
        duration: 2,
      });
      getUser();
    }
  }, [isLoading, isSuccess]);

  const showNameModal = () => {
    setNameModal(true);
  };

  const hideNameModal = () => {
    setNameModal(false);
  };

  return (
    <Card
      title="Account Details"
      style={{
        width: "100%",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(12px)",
        borderRadius: "16px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        color: "#fff",
      }}
      headStyle={{
        background: "rgba(255, 255, 255, 0.1)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        color: "#fff",
        fontSize: "18px",
        fontWeight: "500",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* User Info Section */}
      <div className="flex items-center w-full h-[70px] gap-6 ml-6">
        <div className="p-3 rounded-full bg-[rgba(255,255,255,0.1)]">
          <AiOutlineUser size={20} className="text-white" />
        </div>
        <div>
          <div className="font-bold text-sm text-[rgba(255,255,255,0.8)]">
            {name ? name : "Set a username"}
          </div>
          <div className="text-[rgba(255,255,255,0.6)] text-xs font-semibold">
            Address: {shortenAddress(address)}
          </div>
        </div>
      </div>

      {/* Balance Section */}
      <div className="flex items-center w-full h-[70px] gap-6 ml-6">
        <div className="p-3 rounded-full bg-[rgba(255,255,255,0.1)]">
          <FaEthereum size={20} className="text-[#627EEA]" />
        </div>
        <div>
          <div className="font-bold text-sm text-[rgba(255,255,255,0.8)]">
            Native ETH Tokens
          </div>
          <div className="text-[rgba(255,255,255,0.6)] text-xs font-semibold">
            {balance} ETH
          </div>
        </div>
      </div>

      {/* Buttons Section */}
      <Modal
        title="Set a username"
        open={nameModal}
        onOk={() => {
          write?.();
          hideNameModal();
        }}
        onCancel={hideNameModal}
        okText="Proceed To Set"
        cancelText="Cancel"
      >
        <Input
          placeholder="Vitalik Buterin"
          value={username}
          onChange={(val) => setUsername(val.target.value)}
        />
      </Modal>
      <div className="mt-5 flex justify-center items-center gap-5 pb-2">
        <div
          onClick={showNameModal}
          className="w-[180px] text-center border-2 border-[rgba(255,255,255,0.3)] rounded-full font-semibold text-white transition-colors duration-400 hover:bg-[rgba(255,255,255,0.2)] hover:cursor-pointer py-2"
          style={{ backdropFilter: "blur(4px)" }}
        >
          Set Username
        </div>
        <div
          className="w-[180px] text-center border-2 border-[rgba(255,255,255,0.3)] rounded-full font-semibold text-white transition-colors duration-400 hover:bg-[rgba(255,255,255,0.2)] hover:cursor-pointer py-2"
          style={{ backdropFilter: "blur(4px)" }}
        >
          Switch Accounts
        </div>
      </div>
    </Card>
  );
}

export default AccountDetails;
