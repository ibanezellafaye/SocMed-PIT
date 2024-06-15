import { BarChart3, UserCircle } from "lucide-react";
import Layout from "./Layout";
import Sidebar, { SidebarItem } from "./Sidebar";

export default function SidebarItems(){
 return (
    <main className="App">
        <Sidebar>
            <SidebarItem
            icon={<Layout size={20} />}
            text="Dashboard"
            alert
            />
            <SidebarItem icon={<BarChart3 size={20} />} text="Statistics" active  />        
            <SidebarItem icon={<UserCircle size={20} />} text="Users"  />        
            <SidebarItem icon={<Boxes size={20} />} text="Inventory"  />        
        
        </Sidebar>
    </main>
    )
}