import Link from 'next/link';
import { HiOutlineEllipsisHorizontal } from 'react-icons/hi2';

interface Props {
	category: string;
	title: string;
	stat: string;
}

const PanelItemTrends = ({ category, title, stat }: Props) => (
	<div className="flex flex-1 items-center gap-x-2 px-4 py-3 hover:bg-gray-100 transition-colors">
		<div className="flex flex-col gap-y-1 gap-x-2 flex-1">
			<p className="text-xs text-gray-500 font-medium">
				{category} · Trending
			</p>
			<p className="text-sm font-bold text-gray-900">{title}</p>
			<p className="text-xs text-gray-500 font-medium">{stat} posts</p>
		</div>
		<div className="text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-full p-1.5 cursor-pointer transition-colors">
			<Link href="/">
				<HiOutlineEllipsisHorizontal className="w-5 h-5" />
			</Link>
		</div>
	</div>
);

export default PanelItemTrends;
