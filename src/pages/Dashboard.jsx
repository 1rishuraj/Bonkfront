import Card from '../components/Card';
import Wallet from './Wallet';
import Balance from './Balance';
import LivePrice from './LivePrice';
import Buy from './Buy'
import Trans from './Trans';
import Sale from './Sale';
function Dashboard() {

  return (
    <div className=' bg-ylo-100 flex flex-col gap-4'>
      <div className="grid grid-cols-10 gap-4 px-20">
        {/* <Button fxn={fxn} title="Buy Token for 1 SOL" />
        <Button fxn={fxn2} title="Sell 50% tokens" /> */}
        <div className='col-span-7'>
        <Card title="Your Wallet" bg="bg-org-100"> 
          <Wallet/>
        </Card>
        </div>
        <div className='col-span-3'>
        <Card title="Current Balances" bg="bg-ylo-200">
          <Balance/>
        </Card>
        </div>
      </div>
      <div className="grid grid-cols-13 gap-4 px-20">
        {/* <Button fxn={fxn} title="Buy Token for 1 SOL" />
        <Button fxn={fxn2} title="Sell 50% tokens" /> */}
        <div className='col-span-3'>
        <Card title="Live Price" bg="bg-org-100" img="blink.gif">
          <LivePrice/>
        </Card>
        </div>
        <div className='col-span-5'>
        <Card title="Buy Partokens" bg="bg-ylo-200">
          <Buy/>
        </Card>
        </div>
        <div className='col-span-5'>
        <Card title="Sell Partokens" bg="bg-org-100">
          <Sale/>
        </Card>
        </div>
      </div>
      <div className="grid gap-4 px-20">
       <Card title="Transaction History" bg="bg-ylo-200" ht="h-auto">
        <Trans/>
       </Card>
      </div>
    </div>
  )
}

export default Dashboard
