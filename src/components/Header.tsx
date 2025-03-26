import { Link } from '@tanstack/react-router'
import {appConfig} from "@/config/appConfig";
import type {ReactNode} from "react";

const NavItem = ({to, children}: {to: string, children: ReactNode}) => {
  const activeProps = {className: "text-primary"}
  
    return (
        <Link to={to} activeProps={activeProps} className="font-bold text-muted-foreground transition-colors duration-200 hover:text-primary">{children}</Link>
    )
}

export default function Header() {
  return (
    <header className="p-3 bg-header-background">
      <nav className="flex flex-row gap-2">
          <NavItem to="/" >{appConfig.name}</NavItem>
          <NavItem to="/settings" >Settings</NavItem>
        </nav>
    </header>
  )
}
