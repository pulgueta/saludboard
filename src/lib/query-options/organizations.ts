import { convexQuery } from "@convex-dev/react-query";
import { api } from "convex/_generated/api";

export function userOrganizationsQueryOptions() {
  return convexQuery(api.organizations.getForCurrentUser, {});
}
