import EditorOutput from '@/components/EditorOutput'
import { Vote_Skeleton } from '@/components/Vote.ui'
import CommentsSection from '@/components/comment/CommentsSection'
import PostVote from '@/components/post/post-vote/PostVote.server'
import { Separator } from '@/components/ui/Separator'
import { Locale } from '@/config/i18n.config'
import { constructCachedPost } from '@/lib/helpers/cached-post'
import { getAuthSession } from '@/lib/next-auth/cache'
import { redirect } from '@/lib/next-intl/navigation'
import { db } from '@/lib/prisma'
import { redis } from '@/lib/redis'
import { formatTimeToNow } from '@/lib/utils/date-fns'
import { CachedPost } from '@/types/utils/redis'
import { Loader2 } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { FC, Suspense } from 'react'

interface pageProps {
  params: {
    locale: Locale
    subredditName: string
    postId: string
  }
}

const page: FC<pageProps> = async ({ params: { locale, subredditName, postId } }) => {
  const session = await getAuthSession()
  const t = await getTranslations('Pages.r.SubredditName.PostId')

  const cachedPost = (await redis.hgetall(`post:${postId}`)) as CachedPost | null
  let post: CachedPost | null = cachedPost ?? null

  if (!post) {
    const dbPost = await db.post.findUnique({ where: { id: postId }, include: { author: true, votes: true } })
    if (!dbPost) return redirect(`/r/${subredditName}`)

    post = constructCachedPost(dbPost)

    const votesAmt = post.votesAmt
    if (votesAmt > 0) await redis.hset(`post:${postId}`, post)
  } else {
    if (post.votesAmt <= 0) await redis.del(`post:${postId}`)
  }

  const getUserVote = async () =>
    session?.user?.id ? (await db.postVote.findUnique({ where: { postId_userId: { postId, userId: session.user.id } } }))?.vote ?? null : undefined

  return (
    <div className='flex flex-col items-center justify-between sm:flex-row sm:items-start sm:gap-4'>
      <Suspense fallback={<Vote_Skeleton />}>
        <PostVote postId={postId} initialVotesAmt={post.votesAmt} {...{ getUserVote }} />
      </Suspense>
      <div className='self-stretch rounded-sm bg-card p-4 sm:flex-1 sm:self-start'>
        <p className='truncate text-xs text-muted-foreground'>
          {t('Post.posted-by', { username: post.authorUsername })}&nbsp;•&nbsp;{formatTimeToNow(new Date(post.createdAt), locale)}
        </p>
        <h1 className='py-2 text-xl font-semibold leading-6'>{post.title}</h1>
        <EditorOutput parsedOutput={post.content} />
        <Suspense fallback={<Loader2 className='mt-4 h-5 w-5 animate-spin' />}>
          <Separator className='mt-12' />
          <CommentsSection locale={locale} postId={postId} className='mt-4' />
        </Suspense>
      </div>
    </div>
  )
}

export default page
