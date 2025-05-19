import Avatar from '@rd/Avatar';
import Button from '@ui/Button';
import { RiCheckboxCircleFill } from 'react-icons/ri';

interface Props {
	name: string;
	username: string;
	src: string;
	initials: string;
}

const PanelItem = ({ name, username, src, initials }: Props) => (
	<div className="flex flex-1 items-center gap-x-3 px-4 py-3 hover:bg-gray-100 transition-colors">
		<div className="flex items-center gap-x-3 flex-1">
			<div className="flex flex-1 xl:flex-none justify-center xl:justify-start">
				<Avatar src={src} alt={name} initials={initials} />
			</div>
			<div className="hidden xl:flex flex-col">
				<div className="flex items-center gap-x-1">
					<p className="text-base font-semibold">{name}</p>
					{username === 'charlesdeluvio' && <RiCheckboxCircleFill className="text-blue-500 w-4 h-4" />}
				</div>
				<p className="text-sm text-gray-600 font-medium">@{username}</p>
			</div>
		</div>
		<div>
			<button className="bg-black hover:bg-gray-800 text-white font-bold py-1.5 px-4 rounded-full text-sm transition-colors">
				Follow
			</button>
		</div>
	</div>
);

export default PanelItem;
