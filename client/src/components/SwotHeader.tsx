interface SwotHeaderProps {
  title: string;
  icon: string;
  backgroundColor: string;
}

export function SwotHeader(props: SwotHeaderProps){
  return (
      <div className="h-full w-full border-zinc-200 rounded-lg shadow-md p-4 flex flex-col">

          <div className="flex items-center gap-2">
              <div className={`h-12 w-12 p-3 ${props.backgroundColor} rounded-full`}><img className='fill-white' src={props.icon} alt=""/></div>
              <span className="text-gray-700 font-bold select-none">{props.title}</span>
          </div>
      </div>

  )
}