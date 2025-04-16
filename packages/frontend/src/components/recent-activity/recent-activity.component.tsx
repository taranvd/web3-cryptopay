// @ts-nocheck
import { Card, Table } from "antd";
import { useUserStore } from "../../storage/user.storage.ts";
import { ethers } from "ethers";

const columns = [
  {
    title: "Payment Subject",
    dataIndex: "subject",
    key: "subject",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },

  {
    title: "Message",
    dataIndex: "message",
    key: "message",
  },
  {
    title: "Amount",
    key: "amount",
    render: (_, record) => {
      return (
        <div
          style={record.type === "Send" ? { color: "red" } : { color: "green" }}
        >
          {record.type === "Send" ? "-" : "+"}
          {ethers.utils.formatEther(record.amount)} ETH
        </div>
      );
    },
  },
];

function RecentActivity() {
  const history = useUserStore((state) => state.history);

  return (
    <Card
      title="Recent Activity"
      style={{
        width: "100%",
        minHeight: "600px",
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
      bodyStyle={{
        padding: "0",
        overflow: "hidden",
        borderRadius: "0 0 16px 16px",
      }}
    >
      {history && history.length > 0 ? (
        <Table
          dataSource={history}
          columns={columns}
          pagination={{ position: ["bottomCenter"], pageSize: 8 }}
          style={{
            background: "transparent",
            backgroundColor: "transparent",
            td: {
              background: "transparent",
              backgroundColor: "transparent",
            },
            color: "#fff",
          }}
          className="glass-table"
        />
      ) : (
        <div
          style={{
            textAlign: "center",
            color: "#fff",
            padding: "20px",
            background: "rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
        >
          No recent activity available
        </div>
      )}
    </Card>
  );
}

export default RecentActivity;
