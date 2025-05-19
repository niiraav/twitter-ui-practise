import { HiMagnifyingGlass } from 'react-icons/hi2';

const Search = () => (
	<div className="sticky top-0 bg-white py-2 mb-3 z-10">
		<form className="flex flex-col flex-1 gap-y-4">
			<div className="flex flex-1 relative">
				<HiMagnifyingGlass className="w-5 h-5 left-3 top-2.5 absolute flex items-center text-gray-500" />
				<input
					type="search"
					placeholder="Search"
					className="w-full flex items-center pl-10 pr-4 text-sm placeholder:text-sm placeholder:font-medium py-2.5 bg-gray-100 border-gray-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-gray-500 rounded-full"
				/>
				<button className="sr-only bg-blue-500 font-bold text-white px-4 py-2 text-sm rounded-full">
					Search
				</button>
			</div>
		</form>
	</div>
);

export default Search;
