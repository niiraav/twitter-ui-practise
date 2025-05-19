import Link from 'next/link';

const Footer = () => (
	<div className="flex flex-wrap gap-x-3 gap-y-2 px-4 py-4 text-xs text-gray-500 mb-4">
		<Link className="hover:underline" href="/">
			Terms of Service
		</Link>
		<Link className="hover:underline" href="/">
			Privacy Policy
		</Link>
		<Link className="hover:underline" href="/">
			Cookie Policy
		</Link>
		<Link className="hover:underline" href="/">
			Accessibility
		</Link>
		<Link className="hover:underline" href="/">
			Ads info
		</Link>
		<div className="flex items-center gap-x-1">
			<Link className="hover:underline" href="/">
				More
			</Link>
			<span>•••</span>
		</div>
		<div className="">© 2025 X Corp.</div>
	</div>
);

export default Footer;
