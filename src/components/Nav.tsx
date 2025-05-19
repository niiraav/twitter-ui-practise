import { ReactNode } from 'react';
import DialogDemo from '@rd/Dialog';
import PopoverDemo from '@rd/PopoverDemo';
import NavItem from '@ui/NavItem';
import AccountNavItem from '@ui/AccountNavItem';

import { SiTwitter } from 'react-icons/si';
import { RiHome7Line, RiSearchLine, RiBriefcaseLine, RiCheckboxCircleFill } from 'react-icons/ri';
import {
	HiOutlineHome,
	HiHashtag,
	HiOutlineBell,
	HiOutlineEnvelope,
	HiOutlineBookmark,
	HiOutlineUser,
	HiOutlineBuildingOffice2,
} from 'react-icons/hi2';

interface NavLinkItem {
	href: string;
	text: string;
	icon?: ReactNode;
}

const items: NavLinkItem[] = [
	{
		href: '/home',
		text: 'Home',
		icon: <RiHome7Line className="w-6 h-6" />,
	},
	{
		href: '/explore',
		text: 'Explore',
		icon: <RiSearchLine className="w-6 h-6" />,
	},
	{
		href: '/notifications',
		text: 'Notifications',
		icon: <HiOutlineBell className="w-6 h-6" />,
	},
	{
		href: '/messages',
		text: 'Messages',
		icon: <HiOutlineEnvelope className="w-6 h-6" />,
	},
	{
		href: '/grok',
		text: 'Grok',
		icon: <RiSearchLine className="w-6 h-6" />,
	},
	{
		href: '/premium',
		text: 'Premium',
		icon: <RiCheckboxCircleFill className="w-6 h-6" />,
	},
	{
		href: '/bookmarks',
		text: 'Bookmarks',
		icon: <HiOutlineBookmark className="w-6 h-6" />,
	},
	{
		href: '/jobs',
		text: 'Jobs',
		icon: <RiBriefcaseLine className="w-6 h-6" />,
	},
	{
		href: '/communities',
		text: 'Communities',
		icon: <HiOutlineUser className="w-6 h-6" />,
	},
	{
		href: '/verified-orgs',
		text: 'Verified Orgs',
		icon: <HiOutlineBuildingOffice2 className="w-6 h-6" />,
	},
	{
		href: '/profile',
		text: 'Profile',
		icon: <HiOutlineUser className="w-6 h-6" />,
	},
];

const Nav = () => (
	<header className="hidden sm:flex w-24 xl:col-span-2">
		<div className="flex flex-1 xl:w-60 flex-col fixed h-full">
			<div className="flex flex-col flex-1">
				<NavItem href="/home" width="inline" size="default">
					<SiTwitter className="w-6 h-6" />
				</NavItem>
				{items.map(({ href, text, icon }, i) => (
					<div
						key={`header-${i}`}
						className="rounded-lg focus:outline-none overflow-hidden"
					>
						<NavItem 
							href={text === 'More' ? href : '/'} 
							width="inline" 
							size="default"
						>
							{icon}
							<div className="hidden xl:inline-flex flex-none text-lg font-medium">
								{text}
							</div>
						</NavItem>
					</div>
				))}
				<PopoverDemo />
				<div className="mt-4">
					<button 
						className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-full w-full max-w-[90%] mx-auto block xl:flex items-center justify-center"
						onClick={() => {
							const dialogTrigger = document.getElementById('dialog-trigger');
							if (dialogTrigger) dialogTrigger.click();
						}}
					>
						<span className="hidden xl:inline">Post</span>
						<span className="xl:hidden">+</span>
					</button>
				</div>
				<div className="mt-auto">
					<DialogDemo />
				</div>
			</div>
			<div>
				<AccountNavItem />
			</div>
		</div>
	</header>
);

export default Nav;
