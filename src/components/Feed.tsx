import Image from 'next/image';
import Post, { BadgeType } from '@ui/Post';
import { ReactNode, useState, useEffect } from 'react';
import { Suspense } from 'react';
import Link from 'next/link';

export interface PostItem {
	name: string;
	username: string;
	content: string;
	description: string;
	date: string;
	src: string;
	following: string;
	followers: string;
	initials: string;
	image?: ReactNode;
	badge?: BadgeType;
}

export const items: PostItem[] = [
	{
		name: 'Jane Doe',
		username: 'janedoe',
		following: '249',
		followers: '663',
		content: 'Design and build templates',
		description:
			'Improve your design skills by making projects. 1 every week, practice with me on Youtube. I use Figma, Tailwind CSS and Webflow.',
		date: '1h',
		src: 'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80',
		initials: 'JD',
		image: (
			<div className="w-full relative h-80 mb-4">
				<Image
					fill={true}
					style={{ objectFit: 'cover' }}
					className="rounded-3xl"
					src="https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80"
					alt="Gradient"
				/>
			</div>
		),
	},
	{
		name: 'John Doe',
		username: 'johndoe',
		following: '138',
		followers: '2,218',
		content: 'I love Figma',
		description: 'I design and hug auto layout everyday',
		date: '2h',
		src: 'https://images.unsplash.com/photo-1532123675048-773bd75df1b4?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80',
		initials: 'JD',
	},
	{
		name: 'Jessica Doe',
		username: 'jessicadoe',
		following: '866',
		followers: '1001',
		content: 'Tailwind CSS is insane',
		description:
			'Should designers code. Should you rename your Figma layers is the 1 billion…',
		date: '3h',
		src: 'https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80',
		initials: 'JD',
	},
	{
		name: 'Joe Doe',
		username: 'joedoe',
		following: '668',
		followers: '1985',
		content: 'Next JS documentation is so good',
		description: 'Next JS enthusiast',
		date: '4h',
		src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80',
		initials: 'JD',
	},
	{
		name: 'Jill Doe',
		username: 'jilldoe',
		following: '256',
		followers: '148',
		content: 'How to use custom fonts with Storybook',
		description: 'Sharing my journey on Storybook, Next JS and Tailwind CSS',
		date: '5h',
		src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80',
		initials: 'JD',
	},
	{
		name: 'Jeff Doe',
		username: 'jeffdoe',
		following: '232',
		followers: '89',
		content: 'Why use Storybook?',
		description: 'Learning and building projects with Next JS',
		date: '6h',
		src: 'https://images.unsplash.com/photo-1642060603505-e716140d45d2?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80',
		initials: 'JD',
	},
	{
		name: 'Jean Doe',
		username: 'jeandoe',
		following: '186',
		followers: '90',
		content: 'Vercel and Netlify are pretty cool',
		description: 'Radix UI Avenger',
		date: '7h',
		src: 'https://images.unsplash.com/photo-1597248374161-426f0d6d2fc9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80',
		initials: 'JD',
	},
	{
		name: 'Jack Doe',
		username: 'jackdoe',
		following: '56',
		followers: '24',
		content: 'Webflow community is awesome',
		description: 'Currently redesigning my portfolio for the 8th time today',
		date: '8h',
		src: '',
		initials: 'JD',
	},
	{
		name: 'Jenny Doe',
		username: 'jennydoe',
		following: '56',
		followers: '23',
		content: 'Radix UI is nice to integrate',
		description: 'Figma and Next JS aficionado',
		date: '9h',
		src: 'https://images.unsplash.com/photo-1597004897768-c503466472cc?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80',
		initials: 'JD',
	},
];

// Badge types for random generation
const badgeTypes: (BadgeType['type'])[] = [
	"ripe-to-reply",
	"engage-now",
	"community-building",
	"hot-topics",
	"insightful-conversations",
	null
];

const Feed = () => {
	// State to hold posts with badges
	const [postsWithBadges, setPostsWithBadges] = useState<PostItem[]>(items);
	// State to track if we're on the client
	const [isClient, setIsClient] = useState(false);

	// Generate random badges only on the client side
	useEffect(() => {
		setIsClient(true);
		
		// Function to generate random badges for posts
		const generateRandomBadges = () => {
			return items.map(item => {
				// Randomly select a badge type or null
				const randomIndex = Math.floor(Math.random() * badgeTypes.length);
				const badgeType = badgeTypes[randomIndex];

				return {
					...item,
					badge: badgeType ? { type: badgeType } : undefined
				};
			});
		};

		// Update posts with random badges
		setPostsWithBadges(generateRandomBadges());
	}, []); // Empty dependency array means this runs once after mount

	return (
		<Suspense fallback={<Loading />}>
			<ul className="[&_p:last-child]:text-slate-500 [&_p:first-child]:text-lg divide-y divide-slate-200">
				{postsWithBadges.map(
					(
						{
							name,
							username,
							content,
							date,
							src,
							initials,
							image,
							following,
							followers,
							description,
							badge
						},
						i,
					) => (
						<li key={`username-${i}`} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer relative">
							<Link href={`/post/${username}/${i}`}>
								<div>
									<Post
										name={name}
										username={username}
										content={content}
										date={date}
										src={src}
										initials={initials}
										description={description}
										followers={followers}
										following={following}
										// Only show badges on the client side
										badge={isClient ? badge : undefined}
									>
										{image}
									</Post>
								</div>
							</Link>
						</li>
					),
				)}
			</ul>
		</Suspense>
	);
};

export default Feed;

function Loading() {
	return <h2>Loading...</h2>;
}
