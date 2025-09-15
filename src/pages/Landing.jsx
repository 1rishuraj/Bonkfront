import Form from "../components/Form"
import Quote from "../components/Quote"
const Landing = () => {
  return (
    <div className="grid grid-cols-10 h-[calc(100vh-128px)]">
      <div className="col-span-7">
      <Quote/>
      </div>
      <div className="col-span-3 my-50">
      <Form/>
      </div>
    </div>
  )
}
export default Landing