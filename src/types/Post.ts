import { objectType } from "nexus";

export const Post = objectType({
  name: "Post",
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.title();
    t.model.content();
    t.model.author();
    t.model.brand();
  }
});
