# Partoken Trading Platform (Devnet)

Partoken is a custom SPL token listed on the **Raydium Devnet Pool** against SOL.  
This project provides a **full-stack trading platform** where users can:

- Buy and sell **Partoken** on Solana Devnet.
- View **transaction history** with live status updates (pending → success/failed).
- Track the **price ratio** of Partoken relative to SOL.
- Check **wallet balance** for SOL and Partoken.
- Export their custodial wallet **private key** for backup.

---

## 🚀 Tech Stack

### Backend (Node.js + Express)
- **Authentication**:  
  - User signup with hashed password (bcrypt).  
  - JWT-based login with token validation middleware.  
- **Custodial Wallets**:  
  - A new Solana wallet is generated for each user on signup.  
  - Private key is stored securely in the DB and accessible via export.  
- **Transactions**:  
  - `/api/v1/txn/buy` → Signs & submits a buy transaction.  
  - `/api/v1/txn/sell` → Signs & submits a sell transaction.  
  - `/txn` → Fetches and updates all user transactions, syncing pending txns with Solana Devnet.  
- **Database Models**:  
  - `User`: Stores user info + wallet keys.  
  - `Txn`: Stores transaction signature, status, type (BUY/SELL), and timestamp.  
- **Solana Web3.js Integration**:  
  - Transaction signing with custodial wallet with status "pending" at 1st.  
  - Status verification using `connection.getTransaction()` to update as "success/failed" later via polling.  

### Frontend (React + Vite)
- **Routing**:  
  - `/` → Landing page (signup/signin).  
  - `/dashboard` → Main dashboard after login.  
- **Dashboard Features**:  
  - `Wallet`: Shows user public key, balance, and private key export option.  
  - `Balance`: Displays SOL + Partoken balance.  
  - `LivePrice`: Real-time Partoken/SOL price ratio from Raydium Devnet pool.  
  - `Buy` / `Sale`: Allows users to initiate token buy/sell transactions.  
  - `Trans`: Shows complete transaction history with live status updates.  
- **UI/UX**:  
  - Built with React, TailwindCSS, and CORS-enabled secure API calls.  

---

## ⚙️ Environment Variables

Backend requires a `.env` file:

