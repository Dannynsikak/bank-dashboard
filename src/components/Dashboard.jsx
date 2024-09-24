import React, { useState, useEffect } from "react";
import BankAccount from "../BankAccount"; // Adjust this import based on your file structure
import { useUser } from "./UserContext"; // Import the custom hook

const Dashboard = () => {
  const { user, loading } = useUser(); // Get user and loading state from context
  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const loadAccount = async () => {
      if (user) {
        console.log("Loading account for user:", user);
        const userAccount = new BankAccount(user.uid); // Initialize BankAccount with user UID
        setAccount(userAccount);

        try {
          await userAccount.loadAccount(); // Load user's account
          console.log("Account loaded successfully.");
        } catch (error) {
          console.error("Error loading account:", error.message);
          setMessage(error.message);
        }
      }
    };

    if (!loading && user) {
      loadAccount();
    }
  }, [user, loading]);

  const handleDeposit = async () => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setMessage("Please enter a valid amount for deposit.");
      return;
    }
    setIsProcessing(true);
    try {
      await account.deposit(parsedAmount);
      setMessage(`Successfully Deposited: $${parsedAmount}`);
      setAmount("");
    } catch (error) {
      console.error("Error during deposit:", error.message);
      setMessage(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleWithdraw = async () => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setMessage("Please enter a valid amount for withdrawal.");
      return;
    }
    setIsProcessing(true);
    try {
      await account.withdraw(parsedAmount);
      setMessage(`Withdrew: $${parsedAmount}`);
      setAmount("");
    } catch (error) {
      console.error("Error during withdrawal:", error.message);
      setMessage(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleShowBalance = () => {
    const balance = account?.checkBalance();
    setMessage(`Balance: $${balance}`);
    console.log("Current balance:", balance);
  };

  // Show loading state while checking authentication
  if (loading) return <div>Loading...</div>;

  // If user is not logged in, prompt to log in
  if (!user) return <div>Please log in</div>;

  return (
    <div className="p-5 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl mb-4 text-center">
        Welcome, {user.displayName || user.email}!
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
            disabled={isProcessing}
          >
            {isProcessing ? "Depositing..." : "Deposit"}
          </button>
          <button
            onClick={handleWithdraw}
            className="bg-red-500 text-white p-2 mr-2 w-1/3"
            disabled={isProcessing}
          >
            {isProcessing ? "Withdrawing..." : "Withdraw"}
          </button>
          <button
            onClick={handleShowBalance}
            className="bg-green-500 text-white p-2 w-1/3"
            disabled={isProcessing}
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
