import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";
import classNames from 'classnames';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '../../lib/navigation';
import axios from 'axios';
import HeaderLogo from './Logo 5.png';


const SidebarContext = createContext();

const linkClasses = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-cyan-300 hover:no-underline active:bg-cyan-500 rounded-sm text-base';

export default function Sidebar() {
    const [expanded, setExpanded] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img src={HeaderLogo} alt='Logo'
                        className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
                    />
                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <div className='flex flex-col items-center gap-2 px-1 py-3 mb-4'>
                        {expanded && <UserProfile user={user} />}
                    </div>

                    <ul className="flex-1 px-3 gap-0.5">
                        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
                            <SidebarItem key={item.key} item={item} />
                        ))}
                    </ul>

                    <ul className='flex flex-col gap-0.5 pt-2 border-t border-black-700 px-2'>
                        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
                            <SidebarItem key={item.key} item={item} />
                        ))}
                    </ul>
                </SidebarContext.Provider>
            </nav>
        </aside>
    );
}

function SidebarItem({ item }) {
    const { expanded } = useContext(SidebarContext);
    const { pathname } = useLocation();

    return (
        <li className={classNames(
            pathname === item.path ? 'bg-cyan-500 text-white' : 'text-black',
            linkClasses,
            "relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group"
        )}>
            {item.icon}
            <Link to={item.path} className="flex items-center gap-2">
                <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-1" : "w-0"}`}>
                    {item.label}
                </span>
            </Link>
            {item.alert && (
                <div className={`absolute right-2 w-2 h-2 rounded bg-cyan-400 ${expanded ? "" : "top-2"}`} />
            )}
            {!expanded && (
                <div className={`
                    absolute left-full rounded-md px-2 py-1 ml-6
                    bg-white text-black text-sm
                    invisible opacity-20 -translate-x-3 transition-all
                    group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                `}>
                    {item.label}
                </div>
            )}
        </li>
    );
}

function UserProfile({ user }) {
    return (
        <div>
            <div className="h-24 w-24 rounded-full bg-cyan-500 bg-cover bg-no-repeat bg-center mx-auto">
                {user.profile_picture ? (
                    <img
                        src={`http://localhost:8000/storage/${user.profile_picture}`}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover mb-2 mx-auto"
                    />
                ) : (
                    <div className="flex items-center justify-center text-white-500 mb-2 h-24 w-24 rounded-full bg-cyan-500 bg-cover bg-no-repeat bg-center">
                        No Image
                    </div>
                )}
            </div>
           
            <div className={`flex justify-between items-center overflow-hidden transition-all w-52 ml-18`}>
                <div className="leading-4">
                    <h4 className="font-semibold mt-4 ml-10">{user.first_name} {user.last_name}</h4>
                    <span className="text-xs text-gray-600 ml-10">{user.email}</span>
                </div>
            </div>
        </div>
    );
}
