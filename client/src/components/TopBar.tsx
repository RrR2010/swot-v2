import { ListDashes, PlusCircle, DownloadSimple } from "phosphor-react";
import * as Tooltip from '@radix-ui/react-tooltip';
import { DropDownMenu } from "./DropdownMenu";



export function TopBar() {
    return(
        <div className="w-full bg-[#242A38] h-20 justify-between items-center flex px-8">
            {/* <button>
            <ListDashes
            color="white"
            size={24}
            />
            </button> */}
            <DropDownMenu/>
 
            <h1 className="text-3xl uppercase text-gray-700 font-black">Análise <span className="text-white"> SWOT</span><span className="text-[#F54B64] font-normal text-sm">beta</span></h1>

            <div className="flex gap-4">
            <Tooltip.Provider delayDuration={200} skipDelayDuration={500}>
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <button className="bg-[#F54B64] p-4 rounded-lg">
                            <PlusCircle size={32} color='white' />
                        </button>
                    </Tooltip.Trigger>
                    <Tooltip.Content
                    className="bg-gray-800 text-white p-2 rounded-md mt-3"
                    >Nova Análise</Tooltip.Content>
                </Tooltip.Root>
            </Tooltip.Provider>

            <Tooltip.Provider delayDuration={200} skipDelayDuration={500}>
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <button className="bg-[#F54B64] p-4 rounded-lg">
                            <DownloadSimple size={32} color='white' />
                        </button>
                    </Tooltip.Trigger>
                    <Tooltip.Content
                    className="bg-gray-800 text-white p-2 rounded-md mt-3"
                    >Exportar</Tooltip.Content>
                </Tooltip.Root>
            </Tooltip.Provider>
            </div>
        </div>
    )
}

