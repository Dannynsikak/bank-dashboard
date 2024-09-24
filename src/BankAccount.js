// src/BankAccount.js
import { getUserAccount, updateUserAccount } from "./lib/firebaseconfig";

class BankAccount {
  constructor() {
    this.balance = 0;
  }

  async loadAccount() {
    const account = await getUserAccount();
    if (account) {
      this.balance = account.accountBalance || 0;
    }
  }

  async deposit(amount) {
    if (amount <= 0) throw new Error("Deposit amount must be positive");
    this.balance += amount;
    await updateUserAccount({ accountBalance: this.balance });
  }

  async withdraw(amount) {
    if (amount <= 0) throw new Error("Withdrawal amount must be positive");
    if (amount > this.balance) throw new Error("Insufficient funds");
    this.balance -= amount;
    await updateUserAccount({ accountBalance: this.balance });
  }

  checkBalance() {
    return this.balance;
  }
}

export default BankAccount;
