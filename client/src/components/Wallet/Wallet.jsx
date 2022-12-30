import "./Wallet.css";
import { useEffect, useState } from "react";
import { getAmountInWallet } from "../../network";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { IoWalletOutline } from "react-icons/io5";
import { Stack } from "react-bootstrap";

const Wallet = () => {
  const [wallet, setWallet] = useState([]);
  const fetchWalletData = async () => {
    const data = await getAmountInWallet();
    setWallet(data);
  };
  useEffect(() => {
    fetchWalletData();
  }, []);

  return (
    <OverlayTrigger
      trigger="click"
      key="bottom"
      placement="bottom"
      overlay={
        <Popover>
          <Popover.Body>
            <Stack gap={1}>
              {wallet.length === 0 ? (
                <strong>Your wallet is empty</strong>
              ) : (
                wallet.map((item, index) => (
                  <>
                    <strong>{item}</strong>
                    {index < wallet.length - 1 ? <hr /> : null}
                  </>
                ))
              )}
            </Stack>
          </Popover.Body>
        </Popover>
      }
    >
      <Button variant="dark" id="walletIcon">
        <IoWalletOutline color="#6C757D" size={36.5} />
      </Button>
    </OverlayTrigger>
  );
};

export default Wallet;
