import { useEffect, useState } from 'react';
import axios from 'axios';
const Wallet = () => {
    const [pkey, setpkey] = useState("");
    const [pvt, setpvt] = useState("");
    async function here() {
        try {
            const res = await axios.get('https://bonkback.vercel.app/', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            console.log(res.data);
            setpvt(res.data.pvtkey);
        } catch (error) {
            console.error("Error fetching private key:", error);
            // Optionally, set an error state to display feedback to the user
        }
    }

    useEffect(() => {
        const temp = localStorage.getItem("pkey")
        setpkey(temp)
    }, [pkey])

    return (
        <div className='flex flex-col gap-2 font-bold p-4'>
            <h1>Wallet Address : <input className='w-[410px] text-base font-medium p-1 bg-ylo-50 border-1 rounded' type="text" value={pkey} readOnly /></h1>
            {pvt.length == 0 ? <button onClick={here} className="button bg-[#53e0bd] hover:bg-[#43aa91]"><h1 className='text-[20px] font-bold'>Export Private Key!</h1></button> :
                <h1>Private Key : <input className='w-[810px] text-base font-medium p-1 bg-ylo-50 border-1 rounded my-1' readOnly type="text" value={pvt} /></h1>
            }
        </div>

    )
}
export default Wallet