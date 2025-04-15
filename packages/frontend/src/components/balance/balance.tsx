// @ts-nocheck
import { Card } from "antd";

const Balance = () => {
  return (
    <Card
      title="Current Balance"
      style={{
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(12px)",
        borderRadius: "16px",
        color: "#fff",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        position: "relative",
        overflow: "hidden",
      }}
      headStyle={{
        background: "rgba(255, 255, 255, 0.1)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        color: "#fff",
        fontSize: "18px",
        fontWeight: "500",
        backdropFilter: "blur(8px)",
      }}
      bodyStyle={{
        padding: "24px",
      }}
    >
      {/* Додатковий ефект підсвітки */}
      <div
        style={{
          position: "absolute",
          top: "-50%",
          right: "-50%",
          width: "200%",
          height: "200%",
          background:
            "radial-gradient(circle, rgba(0,102,255,0.1) 0%, transparent 70%)",
          zIndex: "0",
        }}
      />

      <div className="relative z-10">
        <div className="flex items-end gap-10">
          <h2 className="text-6xl font-bold text-white">$676.12</h2>
          <span className="text-xl text-white opacity-80">Available</span>
        </div>

        <div className="mt-5 flex justify-center items-center gap-5">
          <div
            className="w-[180px] text-center border-2 border-[rgba(255,255,255,0.3)] rounded-full font-semibold text-white transition-colors duration-400 hover:bg-[rgba(255,255,255,0.2)] hover:cursor-pointer"
            style={{ backdropFilter: "blur(4px)" }}
          >
            Swap Tokens
          </div>
          <div
            className="w-[180px] text-center border-2 border-[rgba(255,255,255,0.3)] rounded-full font-semibold text-white transition-colors duration-400 hover:bg-[rgba(255,255,255,0.2)] hover:cursor-pointer"
            style={{ backdropFilter: "blur(4px)" }}
          >
            Bridge Tokens
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Balance;
