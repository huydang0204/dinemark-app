import { inferAsyncReturnType } from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { prisma } from './db';

export async function createContext({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) {
  return {
    req,
    resHeaders,
    prisma,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;