export default function Resolver(callback: Function, Middlewares?: Function[]) {
  return async function (_: any, args: any, ctx: any) {
    if (Middlewares?.length) {
      for (const middleware of Middlewares) {
        try {
          await middleware(ctx.req);
        } catch (e: any) {
          throw new Error(e.message);
        }
      }
    }
    return callback(args, ctx.req)
  };
}