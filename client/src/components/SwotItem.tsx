import { SwotItemHeader } from "./SwotItemTitle";

export function SwotItem() {
    return(
        <div className="w-full h-full bg-white border-zinc-200 rounded-lg shadow-md p-4">
            <SwotItemHeader
            title='Forças'
            icon='fitness_center'
            backgroundColor='bg-green-400'
            />
        </div>

    )
}