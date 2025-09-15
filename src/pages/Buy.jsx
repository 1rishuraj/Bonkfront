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
import { loadContext, SbalContext } from "../context";
const Buy = () => {
    const connection = new Connection('https://api.devnet.solana.com', "confirmed")
    const pkey = localStorage.getItem("pkey")
    const [solbal, setsolbal] = useState(0);
    const {load, setload} = useContext(loadContext)
    const { sbal, setsbal } = useContext(SbalContext)
    async function check() {
        var bal = sbal
        if (solbal <= 0) {
            toast.error("Incorrect SOL input")
            return
        }
        if (solbal > bal) {
            toast.error("Insufficient SOL balance, airdrop some...")
            return
        }
        try {
            setload(true)
            // await new Promise(resolve => setTimeout(resolve, 5000))
               const fromguy = new PublicKey(pkey)
               const raydium = await Raydium.load({
                   owner: fromguy,
                   connection,
                   cluster: "devnet"
               });
               const poolId = "4jQX2qG4aVZsRqPhp5mAkyMdgRYeVjfxSwfF3kp7kRTH";
               // Get pool info
               const { poolInfo, poolKeys, rpcData } = await raydium.cpmm.getPoolInfoFromRpc(poolId);
               const baseIn = NATIVE_MINT.toBase58() === poolInfo.mintA.address;
               console.log(baseIn)
               const inputAmount = new BN(solbal * 1e9); // SOL to lamports
   
               // Calculate swap output
               const swapResult = CurveCalculator.swap(
                   inputAmount,
                   baseIn ? rpcData.baseReserve : rpcData.quoteReserve,
                   baseIn ? rpcData.quoteReserve : rpcData.baseReserve,
                   rpcData.configInfo.tradeFeeRate
               );
               console.log(`SOL given ${swapResult.sourceAmountSwapped / 1e9}`);
               toast.success(`You will receive ${(swapResult.destinationAmountSwapped / 1e9).toFixed(2)} 🦜ParTokens by Pool Ratio`); console.log(`Fee : ${swapResult.tradeFee / 1e9}`); //Fee : 12500000
               // Calculate OwlToken price in SOL
               console.log(`SOL in pool ${rpcData.baseReserve / 1e9}`);
               console.log(`Token in pool ${rpcData.quoteReserve / 1e9}`);
               const priceParInSOL = Number(rpcData.quoteReserve) / Number(rpcData.baseReserve);
               console.log(`💰 Current ParToken price: ${priceParInSOL.toFixed(9)} SOL`);
   
   
               // Build the swap transaction
               const { transaction } = await raydium.cpmm.swap({
                   poolInfo,
                   poolKeys,
                   inputAmount,
                   swapResult,
                   slippage: 0.005, // 0.5% slippage
                   baseIn,
                   destinationWallet: fromguy,
               });
               const block = await connection.getLatestBlockhash();
               transaction.recentBlockhash = block.blockhash;
               transaction.feePayer = fromguy;
               // Serialize transaction for backend signing
               const serializedTx = transaction.serialize({
                   requireAllSignatures: false,
                   verifySignatures: false
               });
   
               // Send serialized transaction to backend for signing
               const res = await axios.post('https://bonkback.vercel.app/api/v1/txn/buy', {
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
            setload(false);
        }

    }

    return (
        <div>
            <div className="py-3 flex gap-4">
                <AnimeInput disabled={load}   Type="number" Place="Enter SOL to receive ParTokens!" Val={solbal} Fxn={(e) => { setsolbal(e.target.value) }} />
                <button
                    onClick={check}
                    disabled={load}
                    className={`button bg-[#53e0bd] ${load
                            ? "opacity-60 cursor-not-allowed"
                            : "hover:bg-[#43aa91] cursor-pointer"
                        }`}
                >
                    <h1 className="text-[20px] font-bold">Buy 🦜!</h1>
                </button>

            </div>
            <div className=" flex gap-1 items-center ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
                <h1 className="text-base">Fee : 0.25% </h1>
            </div>

        </div>
    )
}
export default Buy