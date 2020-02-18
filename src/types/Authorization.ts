import { objectType } from "nexus";

export const Authorization = objectType({
  name: "Authorization",
  definition(t) {
    t.string("token");
    t.field("user", { type: "User" });
  }
});
