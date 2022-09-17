interface CustomButtonProps{
    innerText: string;
    backgroud: string;
    textColor: string;
}

export function CustomButtom(props: CustomButtonProps) {
    return (
        <button className={`py-2 px-6 ${props.backgroud} ${props.textColor}`}>
            {props.innerText}
        </button>
    )
}