import type { MiddlewareFactory } from "./core/types";
import { stackMiddlewares } from "./core/utils/stackMiddlewares";

const middlewares: MiddlewareFactory[] = [];

const middleware = stackMiddlewares(middlewares);

const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|assets|favicon.ico).*)",
    "/(en)/:path*",
  ],
};

export { middleware, config };
