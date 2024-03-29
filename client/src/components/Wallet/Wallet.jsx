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
                <h5>
                  <strong>Your wallet is empty</strong>
                </h5>
              ) : (
                wallet.map((item, index) => (
                  <>
                    <h5>
                      <strong>{item}</strong>
                    </h5>
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
        <IoWalletOutline color="#949494" size={36} />
      </Button>
    </OverlayTrigger>
  );
};

export default Wallet;
