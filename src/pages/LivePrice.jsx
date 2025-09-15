import { Raydium } from "@raydium-io/raydium-sdk-v2";
import { Connection, PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";

const LivePrice = () => {
  const [price, setprice] = useState(0);
  const pkey = localStorage.getItem("pkey")
  const fromguy = new PublicKey("GMNHD1V5Z8WGBHAysofwH3qSk6Y7eWzfPw9iper8eWKz")//give public key that has partoken already else price cant be shown
  const connection = new Connection('https://api.devnet.solana.com', "confirmed")

  async function getprice() {
    const raydium = await Raydium.load({
      owner: fromguy,
      connection,
      cluster: "devnet"
    });
    const poolId = "4jQX2qG4aVZsRqPhp5mAkyMdgRYeVjfxSwfF3kp7kRTH";
    // Get pool info
    const { poolInfo, poolKeys, rpcData } = await raydium.cpmm.getPoolInfoFromRpc(poolId);
    const priceParInSOL = Number(rpcData.quoteReserve) / Number(rpcData.baseReserve);
    return priceParInSOL;
  }


  useEffect(() => {
    // Run once immediately
    getprice().then(function (res) {
      setprice(res)
    })

    // Poll every 3 sec
    const interval = setInterval(() => {
      getprice().then(function (res) {
        setprice(res)
      })
      console.log("hua")
    }, 3000);
    
    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);


  return (<div>
   <div className="flex gap-4 justify-between items-center p-1 my-4">
  <div className="text-[20px] font-bold">1 SOL :</div>
  <span className='flex-shrink-0 text-2xl font-medium p-1 bg-ylo-50 border rounded'>
    {price.toFixed(2)} ParTokens
  </span>
</div>

  </div>
  )
}
export default LivePrice