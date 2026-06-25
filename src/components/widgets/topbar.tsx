import { ThemeButton } from "@/features/theme-button";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { useSidebar } from "../ui/sidebar";

export function Topbar() {
  const { toggleSidebar } = useSidebar();
  return (
    <div className="sticky top-0 shrink-0 z-20 border-b p-4 w-full flex justify-between items-center">
      <Button
        variant={'ghost'}
        className="cursor-pointer"
        size={"icon"}
        onClick={toggleSidebar}
      >
        <Menu className="size-4 stroke-3" />
      </Button>
      <ThemeButton />
    </div>
  )
}
