
import { DropDownMenu } from "./DropdownMenu";



export function TopBar() {
    return(
        <div className="w-full bg-[#242A38] h-20 justify-between items-center flex px-16">
            <h1 className="text-3xl uppercase text-gray-700 font-black">Análise <span className="text-white"> SWOT</span><span className="text-[#F54B64] font-normal text-sm">beta</span></h1>

            <DropDownMenu/>
        </div>
    )
}
