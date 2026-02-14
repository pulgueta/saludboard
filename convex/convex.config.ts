import aggregate from "@convex-dev/aggregate/convex.config";
import presence from "@convex-dev/presence/convex.config";
import storage from "@convex-dev/r2/convex.config";
import rateLimit from "@convex-dev/rate-limiter/convex.config";
import twilio from "@convex-dev/twilio/convex.config";
import { defineApp } from "convex/server";

const app = defineApp();

app.use(rateLimit);
app.use(presence);
app.use(aggregate);
app.use(twilio);
app.use(storage);

export default app;
