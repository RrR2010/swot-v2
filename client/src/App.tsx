import { SwotItem } from './components/SwotItem'
import { TopBar } from './components/TopBar'
import './styles/main.css'

function App() {

  return (
    <div className='flex flex-col'>
      <TopBar/>
      <div className='grid grid-cols-2'>
        <SwotItem/>
        <SwotItem/>
        <SwotItem/>
        <SwotItem/>
      </div>
    </div>
  )
}

export default App
