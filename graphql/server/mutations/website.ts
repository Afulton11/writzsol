import { AuthenticationError } from 'apollo-server-micro';
import { arg, intArg, mutationField, stringArg } from '@nexus/schema';
import { WebsiteStatus, Website } from '@prisma/client';
import { website } from '../models/website';
import { Context } from 'nexus-plugin-prisma/dist/utils';
import { PrismaUtils } from '../../../utils';
import { UserWebsiteError } from '../errors';

export const createWebsite = mutationField('createWebsite', {
  type: website,
  args: {
    location: stringArg({ required: true }),
    title: stringArg({ required: true }),
    status: stringArg({ default: 'PRIVATE', required: true }),
    defaultTheme: stringArg({ default: 'light', required: true })
  },
  async authorize(_root, _args, { auth }) {
    auth.guardIsLoggedIn();
    return true;
  },
  async resolve(_root, args, ctx) {
    const { auth, db } = ctx;
    const user = await auth.getUser();

    const newSite = await db.website.create({
      data: {
        user: {
          connect: {
            email: user.email
          }
        },
        ...args,
        status: <WebsiteStatus>args.status
      }
    });

    return newSite;
  }
});

export const updateWebsite = mutationField('updateWebsite', {
  type: website,
  args: {
    id: intArg({ required: true }),
    title: stringArg(),
    location: stringArg(),
    status: arg({ type: 'WebsiteStatus' }),
    defaultTheme: stringArg()
  },
  authorize: async (_root, { id }, ctx) => {
    const [website, user] = await authorizeUserOwnsWebsite({
      siteId: id,
      ctx
    });

    if (!(website && user)) return false;

    ctx.data = { ...ctx.data, website, user };

    return true;
  },
  resolve: async (_root, args, ctx) => {
    const { db } = ctx;
    const { website } = <{ website: Website }>ctx.data;

    const updatedWebsite = await db.website.update({
      where: {
        id: website.id
      },
      data: {
        ...PrismaUtils.removeNonExistentValues(args)
      }
    });

    if (!updatedWebsite) {
      throw new UserWebsiteError(
        'Error occurred updating website. Was it deleted?'
      );
    }

    return updatedWebsite;
  }
});

export const deleteWebsite = mutationField('deleteWebsite', {
  type: website,
  args: {
    id: intArg({ required: true })
  },
  authorize: async (_root, { id }, ctx) => {
    const [website, user] = await authorizeUserOwnsWebsite({
      siteId: id,
      ctx
    });

    if (!(website && user)) return false;

    ctx.data = { ...ctx.data, website, user };

    return true;
  },
  resolve: async (_root, _args, ctx) => {
    const { db } = ctx;
    const { website } = <{ website: Website }>ctx.data;

    const deletedWebsite = await db.website.delete({
      where: {
        id: website.id
      }
    });

    if (!deletedWebsite) {
      throw new UserWebsiteError('Error occurred deleting website.');
    }

    return deletedWebsite;
  }
});

export const authorizeUserOwnsWebsite = async ({
  siteId,
  ctx
}: {
  siteId: number;
  ctx: Context;
}) => {
  const { auth, db } = ctx;
  auth.guardIsLoggedIn();

  const user = await auth.getUser();
  const website = await db.website.findOne({
    where: {
      id: siteId
    }
  });

  if (!website || website.userId !== user.id) {
    throw new UserWebsiteError(`website ${siteId} does not exist!`);
  }

  return [website, user];
};
