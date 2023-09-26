import { Express } from 'express';

const cors = require('cors');

type StaticOrigin = boolean | string | RegExp | (boolean | string | RegExp)[];

type CustomOrigin = (requestOrigin: string | undefined, callback: (err: Error | null, origin?: StaticOrigin) => void) => void;


export default function setCors(server: Express) {
  const whitelist = ['http://localhost:3000']
  
  const corsOptions = {
  
    origin: function (origin: any, callback: any) {
      console.log(origin);
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
  
    },
  
    credentials: true,
  
  }
  
  server.use(cors(corsOptions))
}
