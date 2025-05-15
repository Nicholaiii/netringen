import { Schema } from 'effect'

export class Site extends Schema.Class<Site>('Site')(Schema.Struct({
  id: Schema.Number,
  name: Schema.String,
  url: Schema.String,
  integrated: Schema.Boolean,
}).annotations({ title: 'Webring Site' })) {}
