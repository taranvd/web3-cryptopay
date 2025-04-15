// @ts-nocheck
import React from "react";
import { Card } from "antd";
import { FaEthereum } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";

function AccountDetails({}) {
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
            Moralis Mage
          </div>
          <div className="text-[rgba(255,255,255,0.6)] text-xs font-semibold">
            Address: 0x12...3456
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
            100.32 ETH
          </div>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="mt-5 flex justify-center items-center gap-5 pb-2">
        <div
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
