import { Twilio } from "@convex-dev/twilio";
import { z } from "zod";

import { zAction } from ".";
import { components } from "./_generated/api";

export const twilio = new Twilio(components.twilio, {
  // biome-ignore lint/style/noNonNullAssertion: will always be defined in convex
  defaultFrom: process.env.TWILIO_PHONE_NUMBER!,
});

export const sendSms = zAction({
  args: z.object({
    to: z.string(),
    body: z.string(),
  }),
  handler: async (ctx, args) => {
    return await twilio.sendMessage(ctx, {
      to: `+57${args.to}`,
      body: args.body,
    });
  },
});
