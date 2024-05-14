import { db } from '@/lib/prisma'
import { redis } from '@/lib/redis'
import { authRouter } from '@/lib/trpc/routers/auth-router'
import { postCreationValidator, postVotingValidator } from '@/lib/validators/post'
import { subredditCreationValidator, subredditJoiningLeavingValidator } from '@/lib/validators/subreddit'
import { TRPCError } from '@trpc/server'
import { getTranslations } from 'next-intl/server'
import { privateProcedure, router } from './init'

export const appRouter = router({
  authRouter,
  createSubreddit: privateProcedure.input(subredditCreationValidator).mutation(async ({ ctx: { locale, userId: creatorId }, input: { name } }) => {
    const t = await getTranslations({ locale, namespace: 'Pages.r.Create.Server' })
    const existingSubreddit = await db.subreddit.findFirst({ where: { name } })

    if (existingSubreddit) throw new TRPCError({ code: 'CONFLICT', message: t('Errors.subreddit-already-exists') })

    const subreddit = await db.subreddit.create({ data: { name, creatorId } })
    return subreddit.name
  }),
  joinLeaveSubreddit: privateProcedure
    .input(subredditJoiningLeavingValidator)
    .mutation(async ({ ctx: { locale, userId }, input: { subredditId } }) => {
      const t = await getTranslations({ locale, namespace: 'Components.JoinLeaveBtn' })

      const subreddit = await db.subreddit.findUnique({ where: { id: subredditId }, include: { subscribers: true } })
      if (!subreddit) throw new TRPCError({ code: 'NOT_FOUND', message: t('Errors.not-found') })

      const isCreator = subreddit.creatorId === userId
      if (isCreator) throw new TRPCError({ code: 'FORBIDDEN', message: t('Errors.creator-cannot-join-leave') })

      const isSubscribed = subreddit.subscribers.find((u) => u.id === userId)
      if (isSubscribed) {
        await db.user.update({
          where: { id: userId },
          data: {
            subscribedSubreddits: {
              disconnect: { id: subredditId },
            },
          },
        })
        return 'UNSUBSCRIBED' as const
      }

      await db.user.update({
        where: { id: userId },
        data: {
          subscribedSubreddits: {
            connect: { id: subredditId },
          },
        },
      })
      return 'SUBSCRIBED' as const
    }),
  publishPost: privateProcedure.input(postCreationValidator).mutation(async ({ ctx: { locale, userId }, input: { title, content, subredditId } }) => {
    const t = await getTranslations({ locale, namespace: 'Components.Editor.Server' })

    const subreddit = await db.subreddit.findUnique({ where: { id: subredditId }, include: { subscribers: true } })
    if (!subreddit) throw new TRPCError({ code: 'NOT_FOUND', message: t('Errors.subreddit-not-found') })

    const isOwner = subreddit.creatorId === userId
    const isSubscribed = subreddit.subscribers.find((u) => u.id === userId)
    if (!isSubscribed && !isOwner) throw new TRPCError({ code: 'FORBIDDEN', message: t('Errors.forbidden') })

    const post = await db.post.create({ data: { title, content, subredditId, authorId: userId } })
    return post.id
  }),
  votePost: privateProcedure.input(postVotingValidator).mutation(async ({ ctx: { locale, userId }, input: { postId, vote } }) => {
    const t = await getTranslations({ locale, namespace: 'Components.PostVote.Server'})

    const post = await db.post.findUnique({ where: { id: postId }, include: { votes: true, author: true } })
    if (!post) throw new TRPCError({ code: 'NOT_FOUND', message: t('Errors.post-not-found') })

    const postVote = await db.postVote.findUnique({ where: { postId_userId: { postId, userId } } })

    const cachedPost = await redis.hgetall(`post:${postId}`)
    if (cachedPost) {
      if (!postVote) await redis.hincrby(`post:${postId}`, 'votesAmt', vote === 'UP' ? 1 : -1)
      else if (postVote.vote === vote) await redis.hincrby(`post:${postId}`, 'votesAmt', vote === 'UP' ? -1 : 1)
      else await redis.hincrby(`post:${postId}`, 'votesAmt', vote === 'UP' ? 2 : -2)
    }

    if (postVote) {
      if (postVote.vote === vote) {
        await db.postVote.delete({ where: { postId_userId: { postId, userId } } })
        return 'DELETED' as const
      }

      await db.postVote.update({ where: { postId_userId: { postId, userId } }, data: { vote } })
      return 'UPDATED' as const
    }

    await db.postVote.create({ data: { postId, userId, vote } })
    return 'CREATED' as const
  }),
})

export type AppRouter = typeof appRouter
