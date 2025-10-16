import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user_id?: string;
    cookies: Record<string, string>;
  }

  export interface Response {
    cookie(name: string, val: string, options?: any): this;
  }
}
