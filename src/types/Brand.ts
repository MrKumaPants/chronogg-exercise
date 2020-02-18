import { objectType } from "nexus";

export const Brand = objectType({
  name: "Brand",
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.name();
    t.model.users({ pagination: false });
  }
});
