<<<<<<< HEAD:client/src/components/SwotItem.tsx
interface SwotItemProps {
  title: string;
  icon: string;
  backgroundColor: string;
}

export function SwotItem(props: SwotItemProps){
  return (
      <div className="h-full w-full border-zinc-200 rounded-lg shadow-md p-4 flex flex-col">

          <div className="flex items-center gap-2">
              <span className={`materials-symbols-outlined ${props.backgroundColor} rounded-full p-4`}>{props.icon}</span>
              <span>{props.title}</span>
          </div>

          <div>
              
          </div>
      </div>

  )
=======
interface SwotItemProps {
    title: string;
    icon: string;
    backgroundColor: string;
}

export function SwotItem(props: SwotItemProps){
    return (
        <div className="h-full w-full border-zinc-200 rounded-lg shadow-md p-4 flex flex-col">

            <div className="flex items-center gap-2">
                <span className={`materials-symbols-outlined ${props.backgroundColor} rounded-full p-4`}>{props.icon}</span>
                <span>{props.title}</span>
            </div>

            <div>
                
            </div>
        </div>

    )
>>>>>>> 59c5b584e89e4f4c203514e55b950a1bf174c3ac:clientside/src/components/SwotItem.tsx
}