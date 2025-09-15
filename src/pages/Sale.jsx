import AnimeInput from "../components/AnimeInput"
import axios from 'axios'
import { NATIVE_MINT } from "@solana/spl-token";
import BN from "bn.js";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import {
  CurveCalculator,

  Raydium,
} from "@raydium-io/raydium-sdk-v2";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { loadContext, PbalContext } from "../context";
const Sale = () => {
  const connection = new Connection('https://api.devnet.solana.com', "confirmed")
  const pkey = localStorage.getItem("pkey")
  const { load, setload } = useContext(loadContext)
  const { pbal, setpbal } = useContext(PbalContext)
  const [per, setper] = useState(0)
  async function check() {
    if (per <= 0) {
      toast.error("Incorrect percent input");
      return;
    }
    if (per > 100) {
      toast.error("Percentage input can't be above 100");
      return;
    }
    try {
      setload(true)
      const recipientPubKey = new PublicKey(pkey)
      const poolId = "4jQX2qG4aVZsRqPhp5mAkyMdgRYeVjfxSwfF3kp7kRTH";
      const tokenMint = "EsXKqtis11bKNb5gsqRrXP8Aj7Mcg6bWMWjXyVJZAaX5";
      const raydium = await Raydium.load({
        owner: new PublicKey(recipientPubKey),
        connection,
        cluster: "devnet"
      });

      // Get pool info
      const { poolInfo, poolKeys, rpcData } = await raydium.cpmm.getPoolInfoFromRpc(poolId);

      // Ensure tokenMint is part of the pool
      if (
        tokenMint !== poolInfo.mintA.address &&
        tokenMint !== poolInfo.mintB.address
      ) {
        toast.error("Token is not part of this pool");
        return;
      }

      const baseIn = tokenMint === poolInfo.mintA.address;

      // Get token balance for this wallet (frontend assumes wallet has token ATA)
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        new PublicKey(recipientPubKey),
        { mint: new PublicKey(tokenMint) }
      );

      if (pbal === 0) {
        toast.error("Buy Partokens first!!");
        return;
      } else {
        console.log(tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount)
      }

      const balanceRaw = tokenAccounts.value[0].account.data.parsed.info.tokenAmount.amount;
      // balanceRaw is already raw amount (big integer string)
      const balanceBN = new BN(balanceRaw);

      // percent math (per = 2 means 2%)
      const sellAmount = balanceBN.mul(new BN(per)).div(new BN(100));



      // Calculate swap output (SOL)
      const swapResult = CurveCalculator.swap(
        sellAmount,
        baseIn ? rpcData.baseReserve : rpcData.quoteReserve,
        baseIn ? rpcData.quoteReserve : rpcData.baseReserve,
        rpcData.configInfo.tradeFeeRate
      );
      console.log(`Token given ${swapResult.sourceAmountSwapped}`);
      toast.success(`You will receive ${(swapResult.destinationAmountSwapped / 1e9).toFixed(2)} SOL`);
      console.log(`Fee : ${swapResult.tradeFee}`); //Fee : 2500000
      // Calculate OwlToken price in SOL
      const priceParInSOL = Number(rpcData.quoteReserve) / Number(rpcData.baseReserve);
      console.log(`💰 base dene wala: ${Number(rpcData.baseReserve)} SOL`);
      console.log(`💰 quote rahne wala: ${Number(rpcData.quoteReserve)} Token`);
      console.log(`💰 Current ParToken price: ${priceParInSOL.toFixed(9)} SOL`);

      // Build the swap transaction (token -> SOL)
      const { transaction } = await raydium.cpmm.swap({
        poolInfo,
        poolKeys,
        inputAmount: sellAmount,
        swapResult,
        slippage: 0.005, // 0.5% slippage
        baseIn,
        destinationWallet: new PublicKey(recipientPubKey), // Where SOL goes
      });
      const block = await connection.getLatestBlockhash();
      transaction.recentBlockhash = block.blockhash;
      transaction.feePayer = recipientPubKey;
      // Serialize transaction for backend signing
      const serializedTx = transaction.serialize({
        requireAllSignatures: false,
        verifySignatures: false
      });

      // Send serialized transaction to backend for signing
      const res = await axios.post('https://bonkback.vercel.app/api/v1/txn/sell', {
        message: Buffer.from(serializedTx).toString("base64")
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        },
      })
      const signature = res.data.txSig;
      toast.success(
        <div>
          Transaction successful!
          <br />
          {' '}
          <a
            href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'blue', textDecoration: 'underline' }}
          >
            View on Explorer
          </a>
        </div>
      );
    } catch (e) {
      console.error(e)
    } finally {
      setload(false)
    }

  }
  return (
    <div>
      <div className="py-3 flex gap-4">
        <AnimeInput disabled={load} Type="number" Step={1} Place="Enter selling percent (e.g., 10 for 10%)" Val={per}
          Fxn={(e) => {
            setper(e.target.value)
          }} />
        <button disabled={load} onClick={check}
          className={`button bg-red-300 ${load
            ? "opacity-60 cursor-not-allowed"
            : "hover:bg-[#E60023] cursor-pointer"
            }`}>
          <h1 className='text-[20px] font-bold'>Sell 🦜!</h1>
        </button>
      </div>
      <div className=" flex gap-1 items-center ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
        <h1 className="text-base">Fee : 2-4% </h1>
      </div>

    </div>
  )
}
export default Sale