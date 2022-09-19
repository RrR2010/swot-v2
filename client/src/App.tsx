import './styles/main.css'
import { SwotHeader } from '../../client/src/components/SwotHeader'
import { TopBar } from '../../client/src/components/TopBar'
import { DraggableSwotItem } from './components/DraggableSwotItem'

function App() {

  return (
    <div className='flex flex-col h-screen w-screen bg-white'>
      <TopBar/>
      <div className='grid grid-cols-2 gap-4 h-full'>
        <div>
            <SwotHeader
            title='Forças'
            icon='/assets/strengh.svg'
            backgroundColor='bg-green-500'
            />
            
          <div className="p-2 w-full">
              <DraggableSwotItem
              tagColor='bg-red'
              itemTitle='Fazer tal coisa'
              />
          </div>
        </div>
        
        <div>
            <SwotHeader
            title='Fraquezas'
            icon='assets/weak.svg'
            backgroundColor='bg-red-500'
            />
        </div>
        
        <div>
            <SwotHeader
            title='Oportunidades'
            icon='assets/oportunity.svg'
            backgroundColor='bg-blue-500'
            />
        </div>
        
        <div>
            <SwotHeader
            title='Ameaças'
            icon='assets/warning.svg'
            backgroundColor='bg-yellow-500'
            />
        </div>
      </div>
    </div>
  )
}

export default App