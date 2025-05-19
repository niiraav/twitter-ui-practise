import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Post, { BadgeType } from '@ui/Post';
import Nav from '@ui/Nav';
import Header from '@ui/Header';
import Search from '@ui/Search';
import Panel from '@ui/Panel';
import PanelItem from '@ui/PanelItem';
import PanelItemTrends from '@ui/PanelItemTrends';
import Footer from '@ui/Footer';
import { items } from '@ui/Feed';
import { Suspense } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Avatar from '@rd/Avatar';

// User account information - matches AccountNavItem
const userAccount = {
  name: "Roy Quilor",
  username: "RoyQuilor",
  avatar: {
    src: "https://pbs.twimg.com/profile_images/1489998205236527108/q2REh8nW_400x400.jpg",
    alt: "Roy Quilor",
    initials: "RQ"
  }
};

// Reply form component
const ReplyForm = ({ username }: { username: string }) => {
  const [replyText, setReplyText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [postedReplies, setPostedReplies] = useState<Array<{text: string, timestamp: string, user?: typeof userAccount}>>([]);
  const [isPosting, setIsPosting] = useState(false);
  
  // Hover effect state for Generate button
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  // Mouse event handler for hover effect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);
  
  // Function to handle the generate button click
  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate loading for 1 second
    setTimeout(() => {
      // Sample placeholder texts that could be generated
      const placeholderTexts = [
        `Thanks for sharing this @${username}! I've been thinking about this topic a lot lately and your perspective is really insightful.`,
        `Great point @${username}! I completely agree with your take on this. Would love to discuss this further sometime.`,
        `Interesting perspective @${username}. I've had a similar experience and found that approaching it differently helped me solve the problem.`,
        `I appreciate you bringing this up @${username}. It's an important conversation that more people should be having.`
      ];
      
      // Randomly select one of the placeholder texts
      const randomIndex = Math.floor(Math.random() * placeholderTexts.length);
      setReplyText(placeholderTexts[randomIndex]);
      
      setIsGenerating(false);
      setHasGenerated(true);
    }, 1000);
  };
  
  // Function to handle posting a reply
  const handleReply = () => {
    if (!replyText.trim()) return;
    
    setIsPosting(true);
    
    // Simulate posting delay
    setTimeout(() => {
      // Add the new reply to the posted replies
      setPostedReplies([...postedReplies, {
        text: replyText,
        timestamp: 'Just now',
        user: userAccount
      }]);
      
      // Clear the reply text
      setReplyText('');
      setHasGenerated(false);
      setIsPosting(false);
    }, 500);
  };
  
  return (
    <>
      <div className="flex gap-x-4 p-4 border-b border-slate-200">
        <div className="flex-shrink-0">
          <Avatar
            src={userAccount.avatar.src}
            alt={userAccount.avatar.alt}
            initials={userAccount.avatar.initials}
          />
        </div>
        <div className="flex-1">
          <div className="mb-2 text-sm text-slate-600">
            Replying to <span className="text-blue-500">@{username}</span>
          </div>
          <textarea
            className="w-full p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white rounded-md"
            placeholder="Post your reply"
            rows={3}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2 text-blue-500">
              <button className="p-2 rounded-full hover:bg-blue-50">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 14V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 10H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="p-2 rounded-full hover:bg-blue-50">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="p-2 rounded-full hover:bg-blue-50">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 9H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 9H15.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="flex gap-x-2">
              {isPosting ? (
                <button 
                  className="px-4 py-2 border border-blue-500 text-blue-500 rounded-full font-medium flex items-center gap-2"
                  disabled
                >
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Posting...
                </button>
              ) : (
                <button 
                  className="px-4 py-2 border border-blue-500 text-blue-500 rounded-full font-medium hover:bg-blue-50"
                  onClick={handleReply}
                  disabled={!replyText.trim()}
                >
                  Reply
                </button>
              )}
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 relative group"
                onClick={handleGenerate}
                disabled={isGenerating}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {/* Hover effect divs */}
                <div
                  className="absolute inset-[-1px] rounded-full pointer-events-none"
                  style={{
                    opacity: isHovering ? 1 : 0,
                    background: "transparent",
                    transition: "opacity 0.3s ease",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "rgba(59, 130, 246, 0.1)",
                      border: "2px solid rgba(59, 130, 246, 0.9)",
                      boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
                      clipPath: "inset(0px round 9999px)",
                      maskImage: "radial-gradient(circle at var(--mouse-x) var(--mouse-y), black, transparent 100%)",
                      WebkitMaskImage: "radial-gradient(circle at var(--mouse-x) var(--mouse-y), black, transparent 100%)",
                      "--mouse-x": `${position.x}%`,
                      "--mouse-y": `${position.y}%`,
                    } as React.CSSProperties}
                  />
                </div>
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </span>
                ) : (hasGenerated ? 'Regenerate' : 'Generate')}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Posted Replies */}
      {postedReplies.length > 0 && (
        <div className="border-t border-slate-200">
          <h3 className="p-4 font-semibold text-slate-900">Replies</h3>
          <ul className="[&_p:last-child]:text-slate-500 [&_p:first-child]:text-lg divide-y divide-slate-200">
            {postedReplies.map((reply, index) => (
              <li key={`reply-${index}`} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex flex-1 gap-x-4">
                  <div className="flex-shrink-0">
                    <Avatar
                      src={reply.user?.avatar.src || userAccount.avatar.src}
                      alt={reply.user?.avatar.alt || userAccount.avatar.alt}
                      initials={reply.user?.avatar.initials || userAccount.avatar.initials}
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex flex-1 justify-between items-start">
                      <div className="flex gap-x-1 text-sm items-center">
                        <span className="text-slate-900 font-bold">{reply.user?.name || userAccount.name}</span>
                        <span className="text-slate-600 font-medium">@{reply.user?.username || userAccount.username}</span>
                        ·
                        <span className="text-slate-600 font-medium">{reply.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <div className="text-slate-600 hover:text-blue-500 hover:bg-blue-50 rounded-full p-1.5 cursor-pointer transition-colors">
                          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-slate-900 mb-4">{reply.text}</div>
                    <div>
                      <ul className="flex justify-between text-slate-500 text-sm">
                        <li className="flex items-center gap-x-2 hover:text-blue-500 cursor-pointer">
                          <svg stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"></path>
                          </svg>
                          <span>0</span>
                        </li>
                        <li className="flex items-center gap-x-2 hover:text-green-500 cursor-pointer">
                          <svg stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"></path>
                          </svg>
                          <span>0</span>
                        </li>
                        <li className="flex items-center gap-x-2 hover:text-pink-500 cursor-pointer">
                          <svg stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path>
                          </svg>
                          <span>0</span>
                        </li>
                        <li className="flex items-center gap-x-2 hover:text-blue-500 cursor-pointer">
                          <svg stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"></path>
                          </svg>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

// Metrics component with subtle styling differences
const PostMetrics = ({ replies = 5, retweets = 12, likes = 28, views = 1024 }) => {
  return (
    <div className="flex justify-between py-3 px-4 border-y border-slate-200 text-sm text-slate-500">
      <div>
        <span className="font-semibold text-slate-700">{replies}</span> Replies
      </div>
      <div>
        <span className="font-semibold text-slate-700">{retweets}</span> Retweets
      </div>
      <div>
        <span className="font-semibold text-slate-700">{likes}</span> Likes
      </div>
      <div>
        <span className="font-semibold text-slate-700">{views}</span> Views
      </div>
    </div>
  );
};

// Create a client-side only component to avoid hydration errors
const ClientOnlyPost = ({ post }: { post: any }) => {
  const [postBadge, setPostBadge] = useState<BadgeType | undefined>(undefined);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    // Mark that we're on the client side
    setIsClient(true);
    
    // Use the existing badge if it exists, otherwise generate a random one
    if (post.badge) {
      setPostBadge(post.badge);
    } else {
      const badgeTypes: (BadgeType['type'])[] = [
        "ripe-to-reply",
        "engage-now",
        "community-building",
        "hot-topics",
        "insightful-conversations",
        null
      ];
      
      const randomIndex = Math.floor(Math.random() * badgeTypes.length);
      const badgeType = badgeTypes[randomIndex];
      setPostBadge(badgeType ? { type: badgeType } : undefined);
    }
  }, [post.badge]); // Include post.badge as a dependency
  
  return (
    <Post
      name={post.name}
      username={post.username}
      content={post.content}
      date={post.date}
      src={post.src}
      initials={post.initials}
      description={post.description}
      followers={post.followers}
      following={post.following}
      badge={isClient ? postBadge : undefined} // Only show badge on client side
    >
      {post.image}
    </Post>
  );
};

// Use dynamic import with ssr: false to ensure the component only renders on client-side
const DynamicPost = dynamic(() => Promise.resolve(ClientOnlyPost), {
  ssr: false,
});

// Component to render the post content
const PostContent = ({ post }: { post: any }) => {
  return (
    <>
      <div className="p-4">
        <DynamicPost post={post} />
      </div>
      
      <PostMetrics />
      
      <ReplyForm username={post.username} />
      
      <div className="p-4 text-center text-slate-500 text-sm">
        No replies yet. Be the first to reply!
      </div>
    </>
  );
};

// Post detail page
const PostDetail = () => {
  const router = useRouter();
  const { username, id } = router.query;
  
  // Early return with loading state if router is not ready
  if (router.isFallback) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  // Safe parsing of post ID
  const postId = typeof id === 'string' ? parseInt(id) : 0;
  
  // Handle case where post doesn't exist
  if (!items[postId]) {
    return <div className="flex justify-center items-center h-screen">Post not found</div>;
  }
  
  const post = items[postId];
  
  return (
    <>
      <Head>
        <title>{`Post by ${post.username} | Twitter UI Clone`}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex max-w-7xl mx-auto xl:grid xl:grid-cols-10 gap-0">
        <Nav />
        <main className="col-span-5 w-full border-x border-slate-200 min-h-screen">
          <Header title="Post" />
          
          <PostContent post={post} />
        </main>
        <aside className="col-span-3 hidden xl:flex flex-col w-[350px] pl-8">
          <div className="sticky top-0">
            <Search />
            <Panel title="What's happening" href="/">
              <PanelItemTrends
                title="Next JS"
                category="Development"
                stat="57.5K"
              />
              <PanelItemTrends title="Figma" category="Design" stat="107.5K" />
              <PanelItemTrends
                title="Webflow"
                category="Design"
                stat="127.5K"
              />
              <PanelItemTrends
                title="Tailwind CSS"
                category="Development"
                stat="87.5K"
              />
              <PanelItemTrends
                title="Vercel"
                category="Development"
                stat="27.5K"
              />
            </Panel>
            <Panel title="Who to follow" href="/">
              <PanelItem
                src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mjd8NzkwMjQ2NTJ8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
                name="Charles Deluvio"
                username="charlesdeluvio"
                initials="CD"
              />
              <PanelItem
                src="https://images.unsplash.com/photo-1613951085587-cfe5d0a6cffc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTZ8NzkwMjQ2NTJ8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
                name="Tolga Ulkan"
                username="tolgaulkan"
                initials="TU"
              />
              <PanelItem
                src="https://images.unsplash.com/photo-1614777735430-7b46df56b404?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw3OTAyNDY1Mnx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                name="Rob Potter"
                username="robpotter"
                initials="RB"
              />
            </Panel>
            <Footer />
          </div>
        </aside>
      </div>
    </>
  );
};

export default PostDetail;
