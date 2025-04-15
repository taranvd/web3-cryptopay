// @ts-nocheck
import { Dropdown, Button } from "antd";
import {
  WalletOutlined,
  CopyOutlined,
  DisconnectOutlined,
} from "@ant-design/icons";
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { shortenAddress } from "../../utils/shorten-address.util";
import { message } from "antd";
import { MESSAGE_CONSTANTS } from "../../constants/messages/message.constant";

const ConnectWalletButton = () => {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect({ connector: new MetaMaskConnector() });

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      message.success(MESSAGE_CONSTANTS.SUCCESS.CONNECT_WALLET.COPIED);
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
      onClick: () => disconnect(),
      danger: true,
    },
  ];

  const menu = {
    items: menuItems,
    onClick: ({ key }: { key: string }) => {
      const item = menuItems.find((i) => i.key === key);
      item?.onClick?.();
    },
  };

  if (!isConnected) {
    return (
      // @ts-ignore
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

  const UnsafeDropdown = Dropdown as any;

  return (
    <UnsafeDropdown menu={menu} placement="bottomRight" trigger={["click"]}>
      <span style={{ cursor: "pointer" }}>
        <Button type="primary" icon={<WalletOutlined />} size="large">
          {shortenAddress(address)}
        </Button>
      </span>
    </UnsafeDropdown>
  );
};

export default ConnectWalletButton;
