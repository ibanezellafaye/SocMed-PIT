import {
	HiMenu,
	HiUser,
    HiUserGroup,
    HiOutlineCog,
    HiOutlineQuestionMarkCircle,
	HiBell,
	HiOutlineAnnotation,
	HiLogout
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/Dashboard',
		icon: <HiMenu />
	},
	{
		key: 'profile',
		label: 'Profile',
		path: '/profile',
		icon: <HiUser />
	},
	{
		key: 'following',
		label: 'Following',
		path: '/following',
		icon: <HiUserGroup />
	},
	
	{
		key: 'notification',
		label: 'Notification',
		path: '/notification',
		icon: <HiBell />
	},

	{
		key: 'messages',
		label: 'Messages',
		path: '/messages',
		icon: <HiOutlineAnnotation />
	}


	
	/*{
		key: 'transactions',
		label: 'Transactions',
		path: '/transactions',
		icon: <HiOutlineDocumentText />
	},
	{
		key: 'student',
		label: 'Student',
		path: '/student',
		icon: <HiUserGroup />
	},
	{
		key: 'messages',
		label: 'Messages',
		path: '/messages',
		icon: <HiOutlineAnnotation />
	}*/
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},

	{
		key: 'Logout',
		label: 'Logout',
		path: '/',
		icon: <HiLogout />
	}
]