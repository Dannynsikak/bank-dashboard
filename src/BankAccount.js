import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"; // Adjust imports for your Firebase version

class BankAccount {
  constructor(uid) {
    this.uid = uid;
    this.db = getFirestore(); // Initialize Firestore
    this.accountRef = doc(this.db, "user", this.uid); // Reference to user's document
  }

  async loadAccount() {
    const docSnap = await getDoc(this.accountRef);
    if (docSnap.exists()) {
      this.accountData = docSnap.data();
      console.log("Account data loaded:", this.accountData);
    } else {
      console.error("No such document!");
    }
  }

  async deposit(amount) {
    if (this.accountData && this.accountData.accountBalance !== undefined) {
      const newBalance = this.accountData.accountBalance + amount;
      await setDoc(
        this.accountRef,
        { accountBalance: newBalance },
        { merge: true }
      );
      console.log(`Deposit successful. New balance: $${newBalance}`);
      this.accountData.accountBalance = newBalance; // Update local account balance
    } else {
      throw new Error("Account data is not loaded or invalid.");
    }
  }

  async withdraw(amount) {
    if (this.accountData && this.accountData.accountBalance !== undefined) {
      if (this.accountData.accountBalance < amount) {
        throw new Error("Insufficient funds.");
      }
      const newBalance = this.accountData.accountBalance - amount;
      await setDoc(
        this.accountRef,
        { accountBalance: newBalance },
        { merge: true }
      );
      console.log(`Withdrawal successful. New balance: $${newBalance}`);
      this.accountData.accountBalance = newBalance; // Update local account balance
    } else {
      throw new Error("Account data is not loaded or invalid.");
    }
  }

  checkBalance() {
    return this.accountData ? this.accountData.accountBalance : 0;
  }
}

export default BankAccount;
