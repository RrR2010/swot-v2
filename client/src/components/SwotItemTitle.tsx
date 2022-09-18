interface SwotItemHeaderProps {
    title: string;
    icon: string;
    backgroundColor: string;
}

export function SwotItemHeader(props: SwotItemHeaderProps){
    return (
        <div className="flex items-center gap-2">
            <span className={`materials-symbols-outlined ${props.backgroundColor} rounded-full p-4`}>{props.icon}</span>
            <span>{props.title}</span>
        </div>
    )
}