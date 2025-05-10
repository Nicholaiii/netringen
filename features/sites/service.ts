import { Context } from "effect";

export class SiteService extends Context.Tag('SiteService')<SiteService, {
  createNewSite: (url: string) => Site
}>() {}
