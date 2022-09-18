import './styles/main.css'
import { SwotItem } from '../../clientside/src/components/SwotItem'
import { TopBar } from '../../clientside/src/components/TopBar'

function App() {

  return (
    <div className='flex flex-col'>
      <TopBar/>
      <div className='grid grid-cols-2'>
        <SwotItem
        title='Forças'
        icon='fitness_center'
        backgroundColor='bg-green-500'
        />
        <SwotItem
        title='Fraquezas'
        icon='link_off'
        backgroundColor='bg-red-500'
        />
        <SwotItem
        title='Oportunidades'
        icon='star'
        backgroundColor='bg-blue-500'
        />
        <SwotItem
        title='Ameaças'
        icon='warning'
        backgroundColor='bg-yellow-500'
        />
      </div>
    </div>
  )
}

export default App
