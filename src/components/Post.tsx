import { ReactNode } from 'react';
import DropdownMenuDemo from '@rd/DropdownMenu';
import HoverCardDemo from '@rd/HoverCard';
import { Badge } from './radix/Badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './radix/Tooltip';

import {
	HiOutlineHeart,
	HiArrowUpTray,
	HiOutlineChatBubbleOvalLeft,
	HiOutlineArrowPath,
	HiOutlineChartBarSquare,
	HiEllipsisHorizontal,
	HiBookmark,
} from 'react-icons/hi2';
import { RiCheckboxCircleFill } from 'react-icons/ri';

export type BadgeType = {
	type: "ripe-to-reply" | "engage-now" | "community-building" | "hot-topics" | "insightful-conversations" | null
	keywords?: string[]
}

interface Props {
	content: string;
	name: string;
	username: string;
	date: string;
	src: string;
	initials: string;
	followers: string;
	following: string;
	description: string;
	children?: ReactNode;
	badge?: BadgeType;
}

const Post = ({
	content,
	name,
	username,
	date,
	children,
	src,
	initials,
	followers,
	following,
	description,
	badge,
	...props
}: Props) => {

	const getBadgeDetails = (type: BadgeType["type"]) => {
		switch (type) {
			case "ripe-to-reply":
				return {
					label: "Ripe to Reply",
					color: "bg-blue-100/20 text-twitter-blue hover:bg-blue-100/30 border-blue-400/30",
					tooltip: "20 new followers in the last hour—perfect time to join the conversation!",
					icon: "💬"
				}
			case "engage-now":
				return {
					label: "Engage Now",
					color: "bg-green-100/20 text-twitter-green hover:bg-green-100/30 border-green-400/30",
					tooltip: "50 likes in 1 hr—trending now!",
					icon: "⏳"
				}
			case "community-building":
				return {
					label: "Community Building",
					color: "bg-purple-100/20 text-twitter-purple hover:bg-purple-100/30 border-purple-400/30",
					tooltip: "Active discussion with your target audience—build connections!",
					icon: "🌱"
				}
			case "hot-topics":
				return {
					label: "Hot Topics",
					color: "bg-red-100/20 text-red-500 hover:bg-red-100/30 border-red-400/30",
					tooltip: "Trending hashtag with high visibility—join the conversation!",
					icon: "🔥"
				}
			case "insightful-conversations":
				return {
					label: "Insightful Conversations",
					color: "bg-yellow-100/20 text-yellow-600 hover:bg-yellow-100/30 border-yellow-400/30",
					tooltip: "Thoughtful discussion with industry experts—add your perspective!",
					icon: "💥"
				}
			default:
				return null
		}
	}

	const badgeDetails = badge?.type ? getBadgeDetails(badge.type) : null;

	return (
	<div className="flex flex-1 gap-x-4">
		<div className="flex-shrink-0">
			<HoverCardDemo
				src={src}
				alt={name}
				initials={initials}
				name={name}
				username={username}
				following={following}
				followers={followers}
				description={description}
			/>
		</div>
		<div className="flex flex-col flex-1">
			<div className="flex flex-1 justify-between items-start">
				<div className="flex gap-x-1 text-sm items-center">
					<span className="text-slate-900 font-bold">{name}</span>
					{username === 'janedoe' && <RiCheckboxCircleFill className="text-blue-500 w-4 h-4 ml-0.5" />}
					<span className="text-slate-600 font-medium">@{username}</span>·
					<span className="text-slate-600 font-medium">{date}</span>
				</div>
				<div className="flex items-center gap-x-2">
					{badgeDetails && (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<div>
										<Badge
											variant="outline"
											className={`text-xs py-0.5 px-2 ${badgeDetails.color} transition-colors pulse-badge`}
										>
											<span className="mr-1">{badgeDetails.icon}</span>
											{badgeDetails.label}
										</Badge>
									</div>
								</TooltipTrigger>
								<TooltipContent side="top" className="bg-slate-800 text-white">
									<p>{badgeDetails.tooltip}</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					)}
					<div className="text-slate-600 hover:text-blue-500 hover:bg-blue-50 rounded-full p-1.5 cursor-pointer transition-colors">
						<HiEllipsisHorizontal className="w-5 h-5" />
					</div>
				</div>
			</div>
			<div className="text-sm text-slate-900 mb-4">{content}</div>
			{children}
			<div>
				<ul className="flex justify-between mt-2 text-xs text-slate-700 [&_li]:flex [&_li]:items-center [&_li]:gap-x-2 [&_li]:cursor-pointer">
					<li className="hover:text-blue-500 group">
						<div className="p-1.5 group-hover:bg-blue-50 rounded-full transition-colors">
							<HiOutlineChatBubbleOvalLeft className="w-5 h-5" />
						</div>
						<span>2</span>
					</li>
					<li className="hover:text-green-500 group">
						<div className="p-1.5 group-hover:bg-green-50 rounded-full transition-colors">
							<HiOutlineArrowPath className="w-5 h-5" />
						</div>
						<span>1</span>
					</li>
					<li className="hover:text-pink-500 group">
						<div className="p-1.5 group-hover:bg-pink-50 rounded-full transition-colors">
							<HiOutlineHeart className="w-5 h-5" />
						</div>
						<span>23</span>
					</li>
					<li className="hover:text-blue-500 group">
						<div className="p-1.5 group-hover:bg-blue-50 rounded-full transition-colors">
							<HiOutlineChartBarSquare className="w-5 h-5" />
						</div>
						<span>20</span>
					</li>
					<li className="flex gap-x-3">
						<div className="hover:text-blue-500 p-1.5 hover:bg-blue-50 rounded-full transition-colors">
							<HiBookmark className="w-5 h-5" />
						</div>
						<div className="hover:text-blue-500 p-1.5 hover:bg-blue-50 rounded-full transition-colors">
							<HiArrowUpTray className="w-5 h-5" />
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
);

};

export default Post;
