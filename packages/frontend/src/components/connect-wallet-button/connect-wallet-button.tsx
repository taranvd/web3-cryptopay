import { Button, Dropdown, MenuProps, message } from "antd";
import {
  WalletOutlined,
  CopyOutlined,
  DisconnectOutlined,
} from "@ant-design/icons";
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { shortenAddress } from "../../utils/shorten-address.util.ts";
import { MESSAGE_CONSTANTS } from "../../constants/messages/message.constant.ts";

const ConnectWalletButton = () => {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      message.success(MESSAGE_CONSTANTS.SUCCESS.CONNECT_WALLET.COPIED);
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "copy",
      label: "Copy address",
      icon: <CopyOutlined />,
      onClick: handleCopyAddress,
    },
    {
      key: "disconnect",
      label: "Disconnect",
      icon: <DisconnectOutlined />,
      onClick: () => disconnect(),
      danger: true,
    },
  ];

  if (!isConnected) {
    return (
      <Button
        type="primary"
        icon={<WalletOutlined />}
        onClick={() => connect()}
        size="large"
      >
        Connect wallet
      </Button>
    );
  }

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <Button type="primary" icon={<WalletOutlined />} size="large">
        {shortenAddress(address)}
      </Button>
    </Dropdown>
  );
};

export default ConnectWalletButton;
