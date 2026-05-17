// components/ui/typography.tsx

import { cn } from "@/lib/utils"

export function H1(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "mb-10 text-4xl font-extrabold tracking-tight lg:text-5xl",
        props.className
      )}
      {...props}
    />
  )
}

export function H2(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "mb-10 text-3xl font-semibold tracking-tight",
        props.className
      )}
      {...props}
    />
  )
}

export function H3(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-2xl font-semibold tracking-tight", props.className)}
      {...props}
    />
  )
}

export function P(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("leading-7 text-muted-foreground", props.className)}
      {...props}
    />
  )
}

export function Lead(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-xl text-muted-foreground", props.className)}
      {...props}
    />
  )
}
