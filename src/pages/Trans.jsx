import { useEffect, useState } from "react"
import axios from 'axios'
const Trans = () => {
  const [arr, setarr] = useState([])
  async function getarr() {
    try {
      const res = await axios.get('https://bonkback.vercel.app/txn', {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      console.log(res.data.arr)
      return res.data.arr;
    } catch (error) {
      console.error("Error fetching private key:", error);
      // Optionally, set an error state to display feedback to the user
    }

  }
  useEffect(() => {
    getarr().then(function (res) {
      if (res) {
        const sorted = [...res].sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp) // latest first
        );
        setarr(sorted);
      } else {
        setarr([]);
      }
    });

    // Poll every 3 sec
    const interval = setInterval(() => {
      getarr().then(function (res) {
        if (res) {
          const sorted = [...res].sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp) // latest first
          );
          setarr(sorted);
        } else {
          setarr([]);
        }
      });

      console.log("TXN hua")
    }, 3000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [])

  return (
    <>
      {arr.length > 0 ? (
        <div>
          <div className="flex gap-3 mx-6 pt-2  rounded-t  bg-ylo-50 items-center">
            <span className="ml-[400px] text-[20px] font-bold mb-2 ">Signature</span>

            <span className="ml-[445px] text-[20px] font-bold mb-2">Result</span>

            <span className="ml-[50px] text-[20px] font-bold mb-2">Timestamp</span>

            <span className="ml-[45px] text-[20px] font-bold mb-2">Type</span>

          </div>
          <div className="flex flex-col mx-6 gap-2">
            {arr.map((e, index) => (
              <div key={index} className="py-2 rounded shadow-lg bg-ylo-50 px-2 flex justify-between items-center">
                <span className='w-auto text-base font-medium p-1 bg-ylo-100 border  rounded'>
                  {e.signature}
                </span>
                <span className="flex gap-7">
                  <span className='w-auto text-base font-medium p-1 bg-ylo-100 border  rounded'>
                    {e.result}
                  </span>
                  <span className='w-auto text-base font-medium p-1 bg-ylo-100 border rounded'>
                    {e.timestamp}
                  </span>
                  <span className='w-auto text-base font-medium p-1 bg-ylo-100 border  rounded'>
                    {e.category}
                  </span>
                </span>
              </div>
            ))}

          </div>
        </div>
      ) : (
        <h1 className="flex items-center justify-center text-[20px] font-bold h-[80px]">No transactions found.</h1>
      )}
    </>
  );

}
export default Trans