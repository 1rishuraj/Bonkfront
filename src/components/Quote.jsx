const Quote = () => {
    return (
        <div className="flex flex-col px-20 ">
            
            <div className="flex flex-col gap-5 my-10">
                <div className="text-left text-8xl font-extrabold ">
                    Trade{" "}
                    <span
                        className="animate-wobble inline-block rotate-4 text-white font-robo tracking-wider"
                        style={{
                            textShadow: `
         4px 4px 0 #43aa91,   /* main outline */
        6px 6px 0 #2c786c,   /* deeper outline */
        0 0 15px  /* glow */`

                        }}
                    >
                        ParToken
                    </span>{" "}
                    Instantly — No Wallet Needed
                </div>
                <div className="text-left text-xl pr-50 ">
                    Buy and sell with SOL in seconds. Secure custodial wallets, instant onboarding, and real-time transaction tracking.
                </div>
                <span className="max-w-[400px] bg-[#fbfbeb] px-4 py-2 rounded border-2 border-gray-950 text-lg font-semibold text-gray-800 "
                    style={{ boxShadow: '4px 4px rgba(0, 0, 0, 1)' }}>
                    <span className="text-[#ff9900]">— </span>
                    powered by
                    <span className="font-extrabold text-[#43aa91]"> Raydium </span>
                    on
                    <span className="font-extrabold text-purple-600"> Solana Devnet </span>
                </span>
            </div>
        </div>
    );

}

export default Quote
