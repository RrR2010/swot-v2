import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { List } from "phosphor-react";

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
    <DropdownMenu.Content className="bg-zinc-50 text-zinc-700 p-2 rounded-sm">
      <DropdownMenu.Item>Nova Análise</DropdownMenu.Item>
      <DropdownMenu.Separator />
      <DropdownMenu.Sub>
        <DropdownMenu.SubTrigger>Exportar</DropdownMenu.SubTrigger>
        <DropdownMenu.Portal>
          <DropdownMenu.SubContent className="bg-zinc-50 text-zinc-700 p-2 rounded-sm">
            <DropdownMenu.Item>Exportar para CSV</DropdownMenu.Item>
            <DropdownMenu.Item>Exportar para PDF</DropdownMenu.Item>
            <DropdownMenu.Arrow />
          </DropdownMenu.SubContent>
        </DropdownMenu.Portal>
      </DropdownMenu.Sub>
      <DropdownMenu.Separator />
      <DropdownMenu.Item>…</DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>
    )
}