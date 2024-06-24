import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { React, useContext, createContext, useState, useEffect, forwardRef } from "react";
import classNames from 'classnames';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from './navigation';
import { useUser } from './UserContext'; // Import the UserContext
import { useTheme } from './App'; // Import the theme context
import HeaderLogo from './Logo 3.png';
import HeaderLogo2 from './Logo 1.png';


const SidebarContext = createContext();

const linkClasses = 'rounded-lg flex items-center gap-2 font-light px-3 py-2 hover:bg-indigo-300 hover:no-underline active:bg-indigo-500 text-base';

const Sidebar = forwardRef(({ onLogout, isOpen }, ref) => {
    const { theme } = useTheme();
    const [expanded, setExpanded] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { } = useUser(); // Use the user context

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
        <aside ref={ref} className="h-screen">
            <nav className={`h-full flex flex-col  border-r shadow-sm rounded-lg ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                <div className="p-4 pb-2 flex justify-between items-center rounded-lg">
                    <img src={theme === 'dark' ? HeaderLogo : HeaderLogo2}  alt='Logo'
                        className={`overflow-hidden transition-all rounded-lg ${expanded ? "w-32" : "w-0"}`}
                    />
                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className={`p-1.5 rounded-lg ${theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-500 ' : ' text-black bg-gray-200 hover:bg-gray-300 '}`}
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <div className='flex flex-col items-center gap-2 px-1 py-3 mb-4 rounded-lg '>
                        {expanded && <UserProfile user={user} />}
                    </div>

                    <ul className={`flex-1 px-3 gap-0.5 rounded-lg ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
                            <SidebarItem key={item.key} item={item} />
                        ))}
                    </ul>

                    <ul className={`flex flex-col gap-0.5 pt-2 border-t border-black-700 px-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
                            <SidebarItem key={item.key} item={item} />
                        ))}
                    </ul>
                </SidebarContext.Provider>
            </nav>
        </aside>
    );
});

export default Sidebar;

function SidebarItem({ item }) {
    const { expanded } = useContext(SidebarContext);
    const { pathname } = useLocation();
    const { theme } = useTheme();


    return (
        <li className={classNames(
            pathname === item.path ? 'bg-indigo-500 text-white rounded-lg' : 'text-black rounded-lg',
            linkClasses,
            `relative flex items-center py-2 px-3 my-1 font-medium rounded-lg cursor-pointer transition-colors group ${theme === 'dark' ? ' text-white' : ' text-black'}`
        )}>
        
            {/* Sidebar Hidden Hover */}
            <Link to={item.path} className="flex items-center gap-2 justify-items-center ml-2 rounded-lg ">
                {item.icon}
                <span className={`overflow-hidden transition-all justify-items-center rounded-lg font-semibold ${expanded ? "w-52 ml-1" : "w-0"}`}>
                    {item.label}
                </span>

            </Link>
            {/* End */}
            {item.alert && (
                <div className={`absolute right-2 w-2 h-2 bg-indigo-400 rounded-lg ${expanded ? "" : "top-2"}`} />
            )}
            {!expanded && (
                <div className={`
                    absolute left-full rounded-lg px-2 py-1 ml-6
                     text-black text-sm 
                    invisible opacity-20 -translate-x-3 transition-all
                    group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 ${theme === 'dark' ? ' text-gray-700 bg-indigo-300' : ' text-black bg-indigo-300'}
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
        <div className="h-24 w-24 rounded-full bg-cover bg-no-repeat bg-center mx-auto">
          {user.profile_image_url ? (
            <img
              src={`http://localhost:8000/storage/${user.profile_image_url}`}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover p-1 ring-2 ring-gray-200 "
            />
          ) : (
            <div className="flex items-center justify-center text-white mb-2 h-24 w-24 rounded-full bg-cover bg-no-repeat bg-center">
              No Image
            </div>
          )}
        </div>
  
        <div className="flex justify-between overflow-hidden transition-all w-52 ml-18 rounded-lg">
          <div className="leading-4 text-center mx-auto">
            <h4 className="font-semibold w-full mt-4 rounded-lg">
              {user.first_name} {user.last_name}
            </h4>
            <span className="font-lg text-semibold text-xs text-center leading-6 text-gray-600">
              {user.email}
            </span>
          </div>
        </div>
      </div>
    );
  }
  
//   export default UserProfile;