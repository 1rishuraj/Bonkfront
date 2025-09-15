import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Topbar from './components/Topbar'
import { Provider } from 'jotai'
import { Toaster } from 'react-hot-toast'
import { SbalContext, PbalContext,loadContext } from './context'
import { useState } from 'react'
function App() {
  const [sbal, setsbal] = useState(0);
  const [pbal, setpbal] = useState(0);
  const [load, setload] = useState(false)
  return (

    <div className='h-screen bg-ylo-100 '>
      <Toaster position="top-right" toastOptions={{
        className: 'toast', // Apply custom class name
        duration: 3000,
      }} />
      <SbalContext.Provider value={{ sbal, setsbal }}>
        <PbalContext.Provider value={{ pbal, setpbal }}>
          <loadContext.Provider value={{load,setload}}>
          <Provider>
            <BrowserRouter>
              <Topbar />
              <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/dashboard' element={<Dashboard />} />
              </Routes>
            </BrowserRouter>
          </Provider>
          </loadContext.Provider>
        </PbalContext.Provider>
      </SbalContext.Provider>
    </div>
  )
}

export default App
