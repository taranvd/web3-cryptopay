// @ts-nocheck
import React, { useState, useEffect } from "react";
import { DollarOutlined, SwapOutlined } from "@ant-design/icons";
import { Modal, Input, InputNumber } from "antd";
import { useUserStore } from "../../storage/user.storage.ts";
import { ethers } from "ethers";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { sepolia } from "@wagmi/chains";
import ABI from "../../assets/abi.json";

function RequestAndPay() {
  const [payModal, setPayModal] = useState(false);
  const [requestModal, setRequestModal] = useState(false);
  const [requestAmount, setRequestAmount] = useState("0.1");
  const [requestAddress, setRequestAddress] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const setUserData = useUserStore((state) => state.setUserData);
  const userAddress = useUserStore((state) => state.name);

  const requests = useUserStore((state) => state.requests);

  const { config } = usePrepareContractWrite({
    chainId: sepolia.id,
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "payRequest",
    args: [0],
    overrides: {
      value: requests[0]?.amount,
    },
  });

  const { write, data } = useContractWrite(config);

  const { config: configRequest } = usePrepareContractWrite({
    chainId: sepolia.id,
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "createRequest",
    args: [
      requestAddress,
      ethers.utils.parseEther(requestAmount.toString()).toString(),
      requestMessage,
    ],
  });

  const { write: writeRequest, data: dataRequest } =
    useContractWrite(configRequest);

  const { isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const { isSuccess: isSuccessRequest } = useWaitForTransaction({
    hash: dataRequest?.hash,
  });

  useEffect(() => {
    if (isSuccess || isSuccessRequest) {
      setUserData(userAddress);
    }
  }, [isSuccess, isSuccessRequest]);

  const showPayModal = () => {
    setPayModal(true);
  };
  const hidePayModal = () => {
    setPayModal(false);
  };

  const showRequestModal = () => {
    setRequestModal(true);
  };
  const hideRequestModal = () => {
    setRequestModal(false);
  };

  return (
    <>
      <Modal
        title="Confirm Payment"
        open={payModal}
        onOk={() => {
          write?.();
          hidePayModal();
        }}
        onCancel={hidePayModal}
        okText="Proceed To Pay"
        cancelText="Cancel"
      >
        {requests && requests.length > 0 && (
          <>
            <h2>Sending payment to {requests[0].subject}</h2>
            <h3>Value: {ethers.utils.formatEther(requests[0].amount)} ETH</h3>

            <p>"{requests[0].message}"</p>
          </>
        )}
      </Modal>
      <Modal
        title="Request A Payment"
        open={requestModal}
        onOk={() => {
          writeRequest?.();
          hideRequestModal();
        }}
        onCancel={hideRequestModal}
        okText="Proceed To Request"
        cancelText="Cancel"
      >
        <p>Amount (ETH)</p>
        <InputNumber
          value={requestAmount ? requestAmount : 0}
          onChange={(val) => setRequestAmount(val)}
        />
        <p>From (address)</p>
        <Input
          placeholder="0x..."
          value={requestAddress}
          onChange={(val) => setRequestAddress(val.target.value)}
        />
        <p>Message</p>
        <Input
          placeholder="Lunch Bill..."
          value={requestMessage}
          onChange={(val) => setRequestMessage(val.target.value)}
        />
      </Modal>
      <div className="w-full h-[150px] flex justify-center items-center gap-[40px]">
        <div
          className="bg-blue-500 h-[100px] w-[100px] rounded-2xl flex justify-center items-center flex-col text-white font-bold text-xl gap-4 relative cursor-pointer"
          onClick={() => {
            showPayModal();
          }}
        >
          <DollarOutlined style={{ fontSize: "26px" }} />
          Pay
          {requests && requests.length > 0 && (
            <div className="absolute top-[-5px] right-[-5px] bg-red-500 h-[25px] w-[25px] rounded-full text-white font-bold flex justify-center items-center">
              <div className="numReqs">{requests.length}</div>
            </div>
          )}
        </div>
        <div
          className="bg-blue-500 h-[100px] w-[100px] rounded-2xl flex justify-center items-center flex-col text-white font-bold text-xl gap-4 relative cursor-pointer"
          onClick={() => {
            showRequestModal();
          }}
        >
          <SwapOutlined style={{ fontSize: "26px" }} />
          Request
        </div>
      </div>
    </>
  );
}

export default RequestAndPay;
