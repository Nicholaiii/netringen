import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const sites = sqliteTable('sites', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  url: text('url').notNull(),
})
