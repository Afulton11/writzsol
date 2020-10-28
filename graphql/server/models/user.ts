import { objectType } from '@nexus/schema';
import { role } from './role';

export const user = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.role();
    t.model.name();
    t.model.email();
    t.model.emailVerified();
    t.model.image();
    t.model.createdAt();
    t.model.updatedAt();

    t.model.websites();
  }
});
