import Comment from '@/components/comment/Comment'
import WriteComment from '@/components/comment/WriteComment'
import { Locale } from '@/config/i18n.config'
import { getAuthSession } from '@/lib/next-auth/cache'
import { db } from '@/lib/prisma'
import { cn } from '@/lib/utils'
import { formatTimeToNow } from '@/lib/utils/date-fns'
import { FC, HTMLAttributes } from 'react'

interface PostCommentsSection extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  locale: Locale
  postId: string
}

const PostCommentsSection: FC<PostCommentsSection> = async ({ locale, postId, className, ...rest }) => {
  const session = await getAuthSession()
  const comments = await db.comment.findMany({
    where: { postId, replyToId: null },
    include: {
      author: true,
      votes: true,
      replies: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  })

  return (
    <div className={cn('', className)} {...rest}>
      <WriteComment postId={postId} autofocus={false} label />
      {comments.length > 0 && (
        <div className='mt-4 flex flex-col gap-y-6'>
          {comments
            .filter((c) => !c.replyToId)
            .map(async (c) => {
              const votesAmt = c.votes.reduce((acc, vote) => acc + (vote.vote === 'UP' ? 1 : -1), 0)
              const userVote = session?.user?.id ? c.votes.find((v) => v.userId === session.user?.id)?.vote ?? null : undefined
              const createdAt = await formatTimeToNow(new Date(c.createdAt), locale)

              return (
                <div key={c.id} className='flex flex-col gap-2'>
                  <Comment comment={{ ...c, createdAt }} votesAmt={votesAmt} userVote={userVote} />
                  {c.replies.length > 0 && (
                    <div className='space-y-4 border-l pl-4 pt-4'>
                      {c.replies
                        .sort((a, b) => b.createdAt.getTime() + a.createdAt.getTime())
                        .map(async (r) => {
                          const votesAmt = r.votes.reduce((acc, vote) => acc + (vote.vote === 'UP' ? 1 : -1), 0)
                          const userVote = session?.user?.id ? r.votes.find((v) => v.userId === session.user?.id)?.vote ?? null : undefined
                          const createdAt = await formatTimeToNow(new Date(r.createdAt), locale)

                          return <Comment key={r.id} comment={{ ...r, createdAt }} votesAmt={votesAmt} userVote={userVote} replyToId={c.id} />
                        })}
                    </div>
                  )}
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}

export default PostCommentsSection
