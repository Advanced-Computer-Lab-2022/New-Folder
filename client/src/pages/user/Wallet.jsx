import { useEffect } from "react";
import { useState } from "react";
import { getAmountInWallet } from "../../network";

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
    <div>
      {wallet.map((item) => (
        <h1>{item}</h1>
      ))}
    </div>
  );
};

export default Wallet;
