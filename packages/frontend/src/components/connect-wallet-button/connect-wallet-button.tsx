// @ts-nocheck
import { useEffect, useState } from "react";
import { Dropdown, Button, message } from "antd";
import {
  WalletOutlined,
  CopyOutlined,
  DisconnectOutlined,
} from "@ant-design/icons";
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { shortenAddress } from "../../utils/shorten-address.util";
import { MESSAGE_CONSTANTS } from "../../constants/messages/message.constant";
import { useUserStore } from "../../storage/user.storage";

const ConnectWalletButton = () => {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect({ connector: new MetaMaskConnector() });

  const setUserData = useUserStore((state) => state.setUserData);
  const clearUserData = useUserStore((state) => state.clearUserData);

  const [hasCopied, setHasCopied] = useState(false);

  const handleCopyAddress = () => {
    if (address && !hasCopied) {
      navigator.clipboard.writeText(address);
      message.success(MESSAGE_CONSTANTS.SUCCESS.CONNECT_WALLET.COPIED);
      setHasCopied(true);

      setTimeout(() => setHasCopied(false), 1000);
    }
  };

  const menuItems = [
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
      onClick: () => {
        disconnect();
        clearUserData();
      },
      danger: true,
    },
  ];

  const menu = {
    items: menuItems,
  };

  useEffect(() => {
    if (isConnected && address) {
      setUserData(address);
    }
  }, [isConnected, address, setUserData]);

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
    <Dropdown menu={menu} placement="bottomRight" trigger={["click"]}>
      <span style={{ cursor: "pointer" }}>
        <Button type="primary" icon={<WalletOutlined />} size="large">
          {shortenAddress(address)}
        </Button>
      </span>
    </Dropdown>
  );
};

export default ConnectWalletButton;
