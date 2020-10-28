import { extendType } from '@nexus/schema';
import {
  WebsiteWhereUniqueInput,
  WebsiteUpdateArgs,
  WebsiteDeleteArgs,
  WebsiteCreateArgs
} from '@prisma/client';
import { Context } from 'nexus-plugin-prisma/dist/utils';
import { UserWebsiteError } from '../errors';

export const websiteMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneWebsite({
      alias: 'createWebsite',
      authorize: async (_root, args, { auth }) => {
        return auth.guardIsLoggedIn();
      }
    });

    t.crud.updateOneWebsite({
      alias: 'updateWebsite',
      authorize: async (_root, args: WebsiteUpdateArgs, ctx) => {
        const [website, user] = await authorizeUserOwnsWebsite({
          whereWebsite: args.where,
          ctx
        });

        return !!(website && user);
      }
    });

    t.crud.deleteOneWebsite({
      alias: 'deleteWebsite',
      authorize: async (_root, args: WebsiteDeleteArgs, ctx) => {
        const [website, user] = await authorizeUserOwnsWebsite({
          whereWebsite: args.where,
          ctx
        });

        return !!(website && user);
      }
    });
  }
});

export const authorizeUserOwnsWebsite = async ({
  whereWebsite,
  ctx
}: {
  whereWebsite: WebsiteWhereUniqueInput;
  ctx: Context;
}) => {
  const { auth, db } = ctx;

  auth.guardIsLoggedIn();

  const user = await auth.getUser();
  const website = await db.website.findOne({
    where: whereWebsite
  });

  if (!website || website.userId !== user.id) {
    throw new UserWebsiteError(`website does not exist!`, whereWebsite);
  }

  return [website, user];
};
