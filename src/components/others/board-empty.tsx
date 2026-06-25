import { Kanban, Plus } from "lucide-react";
import { Button } from "../ui/button";

export function BoardEmpty() {
  return (
    <div className='p-4 space-y-12'>
      <div>
        <h1 className='text-xl font-bold font-heading'>Your Boards</h1>
        <div className='text-sm text-muted-foreground'>No board yet</div>
      </div>
      <div className='flex flex-col items-center justify-center space-y-4'>
        <div className='p-4 rounded-full bg-muted-foreground/20'><Kanban className='size-5 stroke-5' /></div>
        <h2 className='font-heading font-semibold text-lg'>No boards yet</h2>
        <p className='text-muted-foreground text-sm'>Create your first board to start organizing tasks with lists and cards.</p>
        <Button className='bg-accent dark:text-accent-foreground hover:bg-accent/80 transition-colors ease-in-out cursor-pointer'><Plus /> Create you first board</Button>
      </div>
    </div >

  )
}
