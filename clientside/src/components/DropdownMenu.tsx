import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { List,  PlusCircle, DownloadSimple, MicrosoftExcelLogo, FilePdf  } from "phosphor-react";

export function DropDownMenu() {
    return (
        <DropdownMenu.Root>
  <DropdownMenu.Trigger className="focus:outline-none">
    <List
    color="white"
    size={30}
    />  
  </DropdownMenu.Trigger>
  <DropdownMenu.Portal>
    <DropdownMenu.Content className="bg-zinc-50 text-zinc-700 p-2 rounded-lg shadow-md mr-16 mt-2">
      <DropdownMenu.Item className="flex items-center gap-2 p-2 hover:outline-none cursor-pointer hover:bg-zinc-100 hover:text-[#F54B64] text-lg">
        <PlusCircle
        color="gray"
        />
        Nova Análise
        </DropdownMenu.Item>
      <DropdownMenu.Separator />
      <DropdownMenu.Sub>
        <DropdownMenu.SubTrigger className="flex items-center gap-2 p-2 hover:outline-none cursor-pointer hover:bg-zinc-100 hover:text-[#F54B64] text-lg">
            <DownloadSimple
            color="gray"
            />
            Exportar</DropdownMenu.SubTrigger>
        <DropdownMenu.Portal>
          <DropdownMenu.SubContent className="bg-zinc-50 text-zinc-700 p-2 rounded-lg shadow-md">
            <DropdownMenu.Item className="flex items-center gap-2 p-2 hover:outline-none cursor-pointer hover:bg-zinc-100 hover:text-[#F54B64] text-lg">
                <MicrosoftExcelLogo
                color="gray"
                />
                Exportar para CSV</DropdownMenu.Item>
            <DropdownMenu.Item className="flex items-center gap-2 p-2 hover:outline-none cursor-pointer hover:bg-zinc-100 hover:text-[#F54B64] text-lg">
                <FilePdf
                color="gray"
                />
                Exportar para PDF</DropdownMenu.Item>
            <DropdownMenu.Arrow />
          </DropdownMenu.SubContent>
        </DropdownMenu.Portal>
      </DropdownMenu.Sub>
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>
    )
}