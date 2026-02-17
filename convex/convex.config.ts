import aggregate from "@convex-dev/aggregate/convex.config";
import polar from "@convex-dev/polar/convex.config";
import presence from "@convex-dev/presence/convex.config";
import storage from "@convex-dev/r2/convex.config";
import rateLimit from "@convex-dev/rate-limiter/convex.config";
import twilio from "@convex-dev/twilio/convex.config";
import { defineApp } from "convex/server";

const app = defineApp();

app.use(rateLimit);
app.use(presence);
app.use(aggregate, { name: "patientsAggregate" });
app.use(aggregate, { name: "appointmentsAggregate" });
app.use(aggregate, { name: "recordsAggregate" });
app.use(polar);
app.use(twilio);
app.use(storage);

export default app;
