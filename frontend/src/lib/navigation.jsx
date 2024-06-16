import {HiUserGroup } from 'react-icons/hi'
import { RiUserSettingsFill } from "react-icons/ri";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { RiProfileLine } from "react-icons/ri";
import { MdNotificationsActive } from "react-icons/md";

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/Dashboard',
		icon: <RiDashboardHorizontalFill />
	},
	{
		key: 'profile',
		label: 'Profile',
		path: '/profile',
		icon: <RiProfileLine />
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
		icon: <MdNotificationsActive />
	},

	{
		key: 'messages',
		label: 'Messages',
		path: '/messages',
		icon: <BiSolidMessageSquareDetail />
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
		icon: <RiUserSettingsFill />
	}
]