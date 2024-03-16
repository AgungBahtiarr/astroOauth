import { NOW, column, defineDb, defineTable, } from 'astro:db';


const session = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    userId: column.text({ references: () => user.columns.id }),
    expiresAt: column.number(),
  },
});

const user = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    github_id: column.number({ unique: true }),
    username: column.text({}),
  },
});


// https://astro.build/db/config
export default defineDb({
  tables: { user, session }
});
