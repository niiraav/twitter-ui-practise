import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 mr-2 text-xs py-0.5 px-2 transition-colors pulse-badge",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        "ripe-to-reply": "bg-blue-100/20 text-twitter-blue hover:bg-blue-100/30 border-blue-400/30",
        "engage-now": "bg-green-100/20 text-twitter-green hover:bg-green-100/30 border-green-400/30",
        "community-building": "bg-purple-100/20 text-twitter-purple hover:bg-purple-100/30 border-purple-400/30",
        "hot-topics": "bg-red-100/20 text-red-500 hover:bg-red-100/30 border-red-400/30",
        "insightful-conversations": "bg-yellow-100/20 text-yellow-600 hover:bg-yellow-100/30 border-yellow-400/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  expandedContent?: string
  icon?: string
}

function Badge({ className, variant, expandedContent, icon, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {icon && <span className="mr-1">{icon}</span>}
      {expandedContent || children}
    </div>
  )
}

export { Badge, badgeVariants } 