import { MessageCircle, Repeat2, Heart, BarChart3, Bookmark, Share, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage, Button, Badge, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/components"
import { useState } from "react"

export type BadgeType = {
  type: "ripe-to-reply" | "engage-now" | "community-building" | "hot-topics" | "insightful-conversations" | null
  keywords?: string[]
}

type PostProps = {
  username: string
  handle: string
  avatar: string
  content: string
  time: string
  replies: number
  retweets: number
  likes: number
  views: number
  badge?: BadgeType
  verified?: boolean
}

// Twitter Post component with engagement indicators
export default function TwitterPost({
  username,
  handle,
  avatar,
  content,
  time,
  replies,
  retweets,
  likes,
  views,
  badge,
  verified = false,
}: PostProps) {
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false)

  const getBadgeDetails = (type: BadgeType["type"]) => {
    switch (type) {
      case "ripe-to-reply":
        return {
          label: "Ripe to Reply",
          tooltip: "20 new followers in the last hour—perfect time to join the conversation!",
          icon: "💬"
        }
      case "engage-now":
        return {
          label: "Engage Now",
          tooltip: "50 likes in 1 hr—trending now!",
          icon: "⏳"
        }
      case "community-building":
        return {
          label: "Community Building",
          tooltip: "Active discussion with your target audience—build connections!",
          icon: "🌱"
        }
      case "hot-topics":
        return {
          label: "Hot Topics",
          tooltip: "Trending hashtag with high visibility—join the conversation!",
          icon: "🔥"
        }
      case "insightful-conversations":
        return {
          label: "Insightful Conversations",
          tooltip: "Thoughtful discussion with industry experts—add your perspective!",
          icon: "💥"
        }
      default:
        return null
    }
  }

  const badgeDetails = badge?.type ? getBadgeDetails(badge.type) : null

  // Create enhanced tooltip content with keywords if available
  const getEnhancedTooltip = () => {
    if (!badgeDetails) return null;
    
    let tooltipContent = badgeDetails.tooltip;
    
    // Add keywords information if available
    if (badge?.keywords && badge.keywords.length > 0) {
      tooltipContent = `Matches ${badgeDetails.icon} '${badge.keywords.join("', '")}' | ${tooltipContent}`;
    }
    
    return tooltipContent;
  };

  // Add a subtle highlight to curated posts
  const isCurated = !!badgeDetails
  const curatedClass = isCurated ? "border-l-2 border-l-gray-700 animate-pulse-subtle" : ""

  return (
    <>
      <div
        className={`border-b border-gray-800 p-3 hover:bg-gray-900/50 transition-colors cursor-pointer ${curatedClass}`}
      >
        <div className="flex items-start">
          {/* Avatar and user info */}
          <div className="flex-shrink-0 mr-3">
            <Avatar className="h-10 w-10 rounded-full border border-gray-800">
              <AvatarImage src={avatar} alt={username} />
              <AvatarFallback>{username.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 min-w-0">
            {/* User header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="flex items-center text-sm">
                  <span className="font-bold mr-1 truncate max-w-[120px]">{username}</span>
                  {verified && (
                    <span className="text-twitter-blue mr-1">
                      <svg
                        viewBox="0 0 24 24"
                        aria-label="Verified account"
                        className="h-4 w-4 inline-block fill-current"
                      >
                        <g>
                          <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path>
                        </g>
                      </svg>
                    </span>
                  )}
                  <span className="text-gray-500 text-sm truncate max-w-[120px]">{handle}</span>
                  <span className="text-gray-500 mx-1">·</span>
                  <span className="text-gray-500 text-sm">{time}</span>
                </div>
              </div>

              <div className="flex items-center">
                {badgeDetails && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge
                          variant={badge?.type as any}
                          expandedContent={badgeDetails.label}
                          icon={badgeDetails.icon}
                          className={`mr-2`}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-[200px] bg-twitter-darkGray text-twitter-extraLightGray">
                        <p>{getEnhancedTooltip()}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-gray-500 hover:text-gray-300 hover:bg-gray-800"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Tweet content */}
            <div className="mt-1 mb-2 text-sm">
              <p>{content}</p>
            </div>

            {/* Tweet actions */}
            <div className="flex justify-between items-center mt-2 text-gray-500 max-w-md">
              <button 
                className="flex items-center group"
                onClick={() => setIsReplyModalOpen(true)}
              >
                <div className="p-1.5 rounded-full group-hover:bg-blue-950/40 group-hover:text-twitter-blue transition-colors">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <span className="ml-1 text-xs group-hover:text-twitter-blue">{replies}</span>
              </button>

              <button className="flex items-center group">
                <div className="p-1.5 rounded-full group-hover:bg-green-950/40 group-hover:text-twitter-green transition-colors">
                  <Repeat2 className="h-4 w-4" />
                </div>
                <span className="ml-1 text-xs group-hover:text-twitter-green">{retweets}</span>
              </button>

              <button className="flex items-center group">
                <div className="p-1.5 rounded-full group-hover:bg-pink-950/40 group-hover:text-pink-500 transition-colors">
                  <Heart className="h-4 w-4" />
                </div>
                <span className="ml-1 text-xs group-hover:text-pink-500">{likes}</span>
              </button>

              <button className="flex items-center group">
                <div className="p-1.5 rounded-full group-hover:bg-blue-950/40 group-hover:text-twitter-blue transition-colors">
                  <BarChart3 className="h-4 w-4" />
                </div>
                <span className="ml-1 text-xs group-hover:text-twitter-blue">{views}</span>
              </button>

              <div className="flex items-center space-x-2">
                <button className="p-1.5 rounded-full hover:bg-blue-950/40 hover:text-twitter-blue transition-colors">
                  <Bookmark className="h-4 w-4" />
                </button>

                <button className="p-1.5 rounded-full hover:bg-blue-950/40 hover:text-twitter-blue transition-colors">
                  <Share className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReplyModal
        open={isReplyModalOpen}
        onOpenChange={setIsReplyModalOpen}
        post={{
          username,
          handle,
          avatar,
          content,
          time
        }}
      />
    </>
  )
} 