const Input = ({placehold,val,type="text",onchng}) => {
  return (
 
    <input onChange={onchng} value={val===0?"":val} className="w-full bg-transparent placeholder:text-slate-400 text-slate-100 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder={placehold} type={type}
    />

  )
}
export default Input