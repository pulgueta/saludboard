import { httpRouter } from "convex/server";

import { twilio } from "./sms";

const http = httpRouter();

twilio.registerRoutes(http);

export default http;
