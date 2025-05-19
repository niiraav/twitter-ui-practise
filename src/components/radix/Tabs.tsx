import * as TabsPrimitive from '@radix-ui/react-tabs';
import cx from 'classnames';
import TweetForm from '@ui/TweetForm';
import Feed from '@ui/Feed';

const Tabs = () => (
	<TabsPrimitive.Root className="TabsRoot" defaultValue="tab1">
		<TabsPrimitive.List
			className="TabsList flex w-full bg-white border-b border-b-slate-200"
			aria-label="Timeline options"
		>
			<TabsPrimitive.Trigger
				value="tab1"
				className={cx(
					'TabsTrigger group hover:bg-slate-100 flex-1',
					'px-6 font-bold text-slate-900',
					'focus:z-10 focus:outline-none',
				)}
			>
				<div className="py-4 relative h-full flex flex-col items-center">
					<div>For you</div>
					<span className="h-1 w-1/2 bg-blue-500 absolute left-1/4 -bottom-[1px] rounded-full group-data-[state=active]:opacity-100 opacity-0"></span>
				</div>
			</TabsPrimitive.Trigger>
			<TabsPrimitive.Trigger
				value="tab2"
				className={cx(
					'TabsTrigger group hover:bg-slate-100 flex-1',
					'px-6 font-bold text-slate-900',
					'focus:z-10 focus:outline-none',
				)}
			>
				<div className="py-4 relative h-full flex flex-col items-center">
					<div>Following</div>
					<span className="h-1 w-1/2 bg-blue-500 absolute left-1/4 -bottom-[1px] rounded-full group-data-[state=active]:opacity-100 opacity-0"></span>
				</div>
			</TabsPrimitive.Trigger>
			<TabsPrimitive.Trigger
				value="tab3"
				className={cx(
					'TabsTrigger group hover:bg-slate-100 flex-1',
					'px-6 font-bold text-slate-900',
					'focus:z-10 focus:outline-none',
				)}
			>
				<div className="py-4 relative h-full flex flex-col items-center">
					<div>Build in Public</div>
					<span className="h-1 w-1/2 bg-blue-500 absolute left-1/4 -bottom-[1px] rounded-full group-data-[state=active]:opacity-100 opacity-0"></span>
				</div>
			</TabsPrimitive.Trigger>
		</TabsPrimitive.List>
		<TabsPrimitive.Content value="tab1" className="TabsContent ">
			<TweetForm width="default" />
			<Feed />
		</TabsPrimitive.Content>
		<TabsPrimitive.Content value="tab2" className="TabsContent ">
			<TweetForm width="default" />
			<div className="flex flex-col items-center justify-center py-10 text-slate-600">
				<p className="text-lg font-medium">Following timeline coming soon</p>
				<p className="text-sm mt-2">Follow more accounts to see their posts here</p>
			</div>
		</TabsPrimitive.Content>
		<TabsPrimitive.Content value="tab3" className="TabsContent ">
			<TweetForm width="default" />
			<div className="flex flex-col items-center justify-center py-10 text-slate-600">
				<p className="text-lg font-medium">Build in Public content coming soon</p>
				<p className="text-sm mt-2">Share your progress and get feedback from the community</p>
			</div>
		</TabsPrimitive.Content>
	</TabsPrimitive.Root>
);

export default Tabs;
