import { Request } from 'express';

declare module 'express' {
  export interface Request {
    user?: any; // You can define a more specific type if you know the shape of the user object
  }
}
