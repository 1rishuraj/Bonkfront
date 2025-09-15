import { useContext, useEffect, useState } from "react"
import { pkeyatom } from "../store/src/atoms/pkey"
import { useAtomValue } from 'jotai';
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { getAccount, getAssociatedTokenAddressSync, getMint, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
import { PbalContext, SbalContext } from "../context";

const Balance = () => {
    const { sbal, setsbal } = useContext(SbalContext)
    const { pbal, setpbal } = useContext(PbalContext)
    var pkey = localStorage.getItem("pkey")
    // pkey="3ESguGJcyhgYWQXfB93e2TMGaZ3tMGFh67CoXPgAenaN"
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    const mint = new PublicKey("EsXKqtis11bKNb5gsqRrXP8Aj7Mcg6bWMWjXyVJZAaX5");
    async function findamt() {
        const ata = getAssociatedTokenAddressSync(mint, new PublicKey(pkey), undefined, TOKEN_2022_PROGRAM_ID);
        const info = await connection.getAccountInfo(ata);

        if (!info) {
            return 0; // no account = 0 balance
        }
        const accountInfo = await getAccount(connection, ata, "confirmed", TOKEN_2022_PROGRAM_ID)
        const rawamt = accountInfo.amount;
        const mintInfo = await getMint(connection, mint, "confirmed", TOKEN_2022_PROGRAM_ID);
        const decimals = mintInfo.decimals;
        return Number(rawamt) / Math.pow(10, decimals);
    }
    useEffect(() => {
        connection.getBalance(new PublicKey(pkey)).then(function (res) {
            console.log(res)
            setsbal(res / LAMPORTS_PER_SOL)
        })
        findamt().then(function (amt) {
            console.log(amt)
                setpbal(amt);
        });
        // Poll every 3 sec
        const interval = setInterval(() => {
            connection.getBalance(new PublicKey(pkey)).then(function (res) {
                setsbal(res / LAMPORTS_PER_SOL)
            })
            findamt().then(function (amt) {
                    setpbal(amt);
            });
            console.log("wallet hua")
        }, 3000);

        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, [])

    return (
        <div className='flex flex-col gap-2 font-bold p-4'>
            <h1>SOL : <span className=' inline-block text-2xl font-medium p-1 bg-ylo-50 border-1 rounded' type="text" >{sbal.toFixed(2) + " SOL"}</span></h1>
            <h1>ParToken : <span className=' inline-block text-2xl font-medium p-1 bg-ylo-50 border-1 rounded' type="text" >{pbal.toFixed(2) + " Tokens"}</span></h1>
        </div>
    )
}
export default Balance