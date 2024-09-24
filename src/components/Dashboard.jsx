// src/components/Dashboard.js
import React, { useState, useEffect } from "react";
import BankAccount from "../BankAccount";
import { useUser } from "../components/UserContext"; // Import the custom hook

const Dashboard = () => {
  const user = useUser(); // get the user from the context
  const [account] = useState(new BankAccount("UserAccount"));
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadAccount = async () => {
      try {
        await account.loadAccount(); // Load user's account on mount
      } catch (error) {
        setMessage(error.message);
      }
    };
    loadAccount();
  }, [account]);

  const handleDeposit = async () => {
    if (!amount || amount <= 0) {
      setMessage("Please enter a valid amount for deposit.");
      return;
    }
    setLoading(true);
    try {
      await account.deposit(Number(amount));
      setMessage(`Successfully Deposited: $${amount}`);
      setAmount("");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!amount || amount <= 0) {
      setMessage("Please enter a valid amount for withdrawal.");
      return;
    }
    setLoading(true);
    try {
      await account.withdraw(Number(amount));
      setMessage(`Withdrew: $${amount}`);
      setAmount("");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleShowBalance = () => {
    setMessage(`Balance: $${account.checkBalance()}`);
  };

  return (
    <div className="p-5 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl mb-4 text-center">
        Welcome {user?.displayName || "User"}
      </h1>
      <div className="mb-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="border p-2 mr-2 w-full"
        />
        <div className="flex justify-between">
          <button
            onClick={handleDeposit}
            className="bg-blue-500 text-white p-2 mr-2 w-1/3"
            disabled={loading}
          >
            {loading ? "Depositing..." : "Deposit"}
          </button>
          <button
            onClick={handleWithdraw}
            className="bg-red-500 text-white p-2 mr-2 w-1/3"
            disabled={loading}
          >
            {loading ? "Withdrawing..." : "Withdraw"}
          </button>
          <button
            onClick={handleShowBalance}
            className="bg-green-500 text-white p-2 w-1/3"
            disabled={loading}
          >
            Show Balance
          </button>
        </div>
      </div>
      {message && <p className="text-lg text-center mt-4">{message}</p>}
    </div>
  );
};

export default Dashboard;
