import { Context } from "../types";

export default function ResolverHandler<T>(callback: (args: any, ctx: Context) => Promise<T>, Middlewares?: Function[]) {
  return async function (_: any, args: any, ctx: Context) {
    /**
     * Apply Middlewares
    */
    if (Middlewares?.length) {
      for (const middleware of Middlewares) {
        try {
          await middleware(ctx);
        } catch (error: any) {
          throw new Error(error.message);
        }
      }
    }

    /**
     * Execute Resolver
    */
    try {
      let data: T = await callback(args, ctx);
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}
