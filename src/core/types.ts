import type { NextMiddleware } from "next/server";

type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

export type { MiddlewareFactory };
