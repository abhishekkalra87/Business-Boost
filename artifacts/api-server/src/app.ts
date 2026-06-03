import express, { type Express, type RequestHandler } from "express";
import cors from "cors";
import router from "./routes";
import { logger } from "./lib/logger";

// Use require to sidestep ESM/CJS interop ambiguity with pino-http on all platforms
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pinoHttp = (require("pino-http").pinoHttp ?? require("pino-http")) as (
  opts: Record<string, unknown>,
) => RequestHandler;

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req: { id: unknown; method: string; url?: string }) {
        return {
          id: req.id,
          method: req.method,
          url: typeof req.url === "string" ? req.url.split("?")[0] : req.url,
        };
      },
      res(res: { statusCode: number }) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
