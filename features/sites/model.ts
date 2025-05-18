import { Schema } from 'effect'

/** @internal */
const SiteSchema = Schema.Struct({
  id: Schema.Number,
  name: Schema.String,
  url: Schema.String,
  integrated: Schema.Boolean,
}).annotations({ title: 'Webring Site' })

export class Site extends Schema.Class<Site>('Site')(SiteSchema) {}

export const SiteInsert = SiteSchema.omit('id', 'integrated').annotations({ title: 'Unsubmitted Webring Site' })
