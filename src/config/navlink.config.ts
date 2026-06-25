import {
  FolderKanban,
  Home,
  type LucideIcon,
} from "lucide-react";

export interface NavLink {
  href: string;
  icon: LucideIcon;
  title: string;
}

export const sidebarNavLinks: NavLink[] = [
  {
    href: "/app",
    icon: Home,
    title: "Home",
  },
  {
    href: "/app/board",
    icon: FolderKanban,
    title: "Board",
  }
];

