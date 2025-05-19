import { RiStarFill } from 'react-icons/ri';
import { HiArrowLeft } from 'react-icons/hi2';
import Link from 'next/link';

const Header = ({ title }: { title: string }) => (
	<div className="sticky bg-white/90 z-10 backdrop-blur-md top-0">
		<div className="flex items-center justify-between px-4 py-3">
			<div className="flex items-center gap-x-3">
				{title !== 'Home' && (
					<Link href="/" className="hover:bg-slate-100 p-1.5 rounded-full transition-colors">
						<HiArrowLeft className="w-5 h-5 text-slate-900" />
					</Link>
				)}
				<h2 className="text-xl font-bold">{title}</h2>
				{title === 'Home' && (
					<div className="ml-2">
						<RiStarFill className="w-5 h-5 text-blue-500" />
					</div>
				)}
			</div>
		</div>
	</div>
);

export default Header;
