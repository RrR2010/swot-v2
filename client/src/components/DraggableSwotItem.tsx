interface DraggableSwotItemProps { 
  tagColor: string
  itemTitle: string
}

export function DraggableSwotItem(props: DraggableSwotItemProps){
  return(
      <div className="rounded h-10 w-full border-zinc-300">
        <div className={`h-full w-4 ${props.tagColor}`}></div>
        <span className="ml-4">{props.itemTitle}</span>
      </div>
  )
}