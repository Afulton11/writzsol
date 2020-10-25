import { arg, intArg, mutationField, stringArg } from '@nexus/schema';
import { Page } from '@prisma/client';
import { page } from '../models/page';
import { PrismaUtils } from '../../../utils';
import { Context } from 'nexus-plugin-prisma/typegen';
import { PageError } from '../errors/page-errors';
import { authorizeUserOwnsWebsite } from './website';

export const addPage = mutationField('createPage', {
  type: page,
  args: {
    websiteId: intArg({ required: true }),
    path: stringArg({ required: true }),
    blocks: arg({ type: 'Json', required: true })
  },
  async authorize(_root, { websiteId }, ctx) {
    const [website, user] = await authorizeUserOwnsWebsite({
      siteId: websiteId,
      ctx
    });

    if (!(website && user)) return false;

    ctx.data = { ...ctx.data, website, user };

    return true;
  },
  async resolve(_root, { path, blocks }, ctx) {
    const { db } = ctx;
    const { website } = ctx.data;

    const newPage = await db.page.create({
      data: {
        website: {
          connect: {
            id: website.id
          }
        },
        path,
        blocks
      }
    });

    return newPage;
  }
});

export const updatePage = mutationField('updatePage', {
  type: page,
  args: {
    id: intArg({ required: true }),
    path: stringArg(),
    blocks: arg({ type: 'Json' })
  },
  authorize: async (_root, { id }, ctx) => {
    const [page, website, user] = await authorizePageEdit({
      pageId: id,
      ctx
    });

    if (!(page && website && user)) return false;

    ctx.data = { ...ctx.data, page, website, user };

    return true;
  },
  resolve: async (_root, args, ctx) => {
    const { db } = ctx;
    const { page } = <{ page: Page }>ctx.data;

    const updatedPage = await db.page.update({
      where: {
        id: page.id
      },
      data: {
        ...PrismaUtils.removeNonExistentValues(args),
        updatedAt: new Date()
      }
    });

    if (!updatedPage) {
      throw new PageError(
        'Error occurred updating page. Was it recently deleted?'
      );
    }

    return updatedPage;
  }
});

export const deletePage = mutationField('deletePage', {
  type: page,
  args: {
    id: intArg({ required: true })
  },
  authorize: async (_root, { id }, ctx) => {
    const [page, website, user] = await authorizePageEdit({
      pageId: id,
      ctx
    });

    if (!(page && website && user)) return false;

    ctx.data = { ...ctx.data, page, website, user };

    return true;
  },
  resolve: async (_root, _args, ctx) => {
    const { db } = ctx;
    const { page } = <{ page: Page }>ctx.data;

    const deletedPage = await db.page.delete({
      where: {
        id: page.id
      }
    });

    if (!deletedPage) {
      throw new PageError('Error occurred deleting page.');
    }

    return deletedPage;
  }
});

const authorizePageEdit = async ({
  pageId,
  ctx
}: {
  pageId: number;
  ctx: Context;
}) => {
  const { auth, db } = ctx;
  auth.guardIsLoggedIn();

  const page = await db.page.findOne({
    where: {
      id: pageId
    }
  });

  if (!page) {
    throw new PageError(`page ${pageId} does not exist!`);
  }

  const [website, user] = await authorizeUserOwnsWebsite({
    siteId: page.websiteId,
    ctx
  });

  return [page, website, user];
};
