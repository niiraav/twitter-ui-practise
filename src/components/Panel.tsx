import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
	title: string;
	href: string;
	children: ReactNode;
}

const Panel = ({ title, href, children }: Props) => (
	<div className="bg-gray-50 rounded-2xl mb-4 overflow-hidden">
		<div className="px-4 py-3 border-b border-gray-200">
			<h2 className="text-xl font-bold leading-none">{title}</h2>
		</div>
		{children}
		<div className="px-4 py-3 hover:bg-gray-100 transition-colors">
			<Link className="text-sm text-blue-500 font-medium block" href={href}>
				Show more
			</Link>
		</div>
	</div>
);

export default Panel;
