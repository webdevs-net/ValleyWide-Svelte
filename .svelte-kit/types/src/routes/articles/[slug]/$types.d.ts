import type * as Kit from '@sveltejs/kit';

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
type RouteParams = { slug: string }
type RouteId = '/articles/[slug]';
type MaybeWithVoid<T> = {} extends T ? T | void : T;
export type RequiredKeys<T> = { [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K; }[keyof T];
type OutputDataShape<T> = MaybeWithVoid<Omit<App.PageData, RequiredKeys<T>> & Partial<Pick<App.PageData, keyof T & keyof App.PageData>> & Record<string, any>>
type EnsureDefined<T> = T extends null | undefined ? {} : T;
type OptionalUnion<U extends Record<string, any>, A extends keyof U = U extends U ? keyof U : never> = U extends unknown ? { [P in Exclude<A, keyof U>]?: never } & U : never;
export type Snapshot<T = any> = Kit.Snapshot<T>;
type PageServerParentData = Omit<Omit<EnsureDefined<import('../../$types.js').LayoutServerData>, keyof import('../$types.js').LayoutServerData> & EnsureDefined<import('../$types.js').LayoutServerData>, keyof LayoutServerData> & EnsureDefined<LayoutServerData>;
type PageParentData = Omit<Omit<EnsureDefined<import('../../$types.js').LayoutData>, keyof import('../$types.js').LayoutData> & EnsureDefined<import('../$types.js').LayoutData>, keyof LayoutData> & EnsureDefined<LayoutData>;
type LayoutRouteId = RouteId | "/articles/[slug]"
type LayoutParams = RouteParams & { slug?: string }
type LayoutParentData = Omit<EnsureDefined<import('../../$types.js').LayoutData>, keyof import('../$types.js').LayoutData> & EnsureDefined<import('../$types.js').LayoutData>;

export type EntryGenerator = () => Promise<Array<RouteParams>> | Array<RouteParams>;
export type PageServerLoad<OutputData extends OutputDataShape<PageServerParentData> = OutputDataShape<PageServerParentData>> = Kit.ServerLoad<RouteParams, PageServerParentData, OutputData, RouteId>;
export type PageServerLoadEvent = Parameters<PageServerLoad>[0];
export type ActionData = unknown;
export type PageServerData = Expand<OptionalUnion<EnsureDefined<Kit.AwaitedProperties<Awaited<ReturnType<typeof import('./proxy+page.server.js').load>>>>>>;
export type PageData = Expand<Omit<PageParentData, keyof PageServerData> & EnsureDefined<PageServerData>>;
export type Action<OutputData extends Record<string, any> | void = Record<string, any> | void> = Kit.Action<RouteParams, OutputData, RouteId>
export type Actions<OutputData extends Record<string, any> | void = Record<string, any> | void> = Kit.Actions<RouteParams, OutputData, RouteId>
export type LayoutServerData = null;
export type LayoutData = Expand<LayoutParentData>;
export type RequestEvent = Kit.RequestEvent<RouteParams, RouteId>;