import { queryType } from '@nexus/schema';

export const queries = queryType({
  definition(t) {
    t.crud.website();
    t.crud.websites({
      filtering: true,
      ordering: true,
      pagination: true
    });

    t.crud.page();
    t.crud.pages();
  }
});
