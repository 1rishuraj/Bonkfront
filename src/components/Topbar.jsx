import { useNavigate } from "react-router-dom"
import AnimeButton from './AnimeButton'
const Topbar = () => {
    const nav = useNavigate()
    return (
        <div  className="flex items-center ml-20 py-10">
            <AnimeButton fxn={() => { nav("/"); }} title="🦜ParToken" />
        </div>

    )
}
export default Topbar

