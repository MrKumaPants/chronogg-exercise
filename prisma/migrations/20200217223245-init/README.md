# Migration `20200217223245-init`

This migration has been generated at 2/17/2020, 10:32:45 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."new_User" (
    "active" BOOLEAN NOT NULL DEFAULT false ,
    "createdAt" DATE NOT NULL DEFAULT '1970-01-01 00:00:00' ,
    "email" TEXT NOT NULL DEFAULT '' ,
    "id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,
    "name" TEXT   ,
    "password" TEXT NOT NULL DEFAULT '' 
) 

INSERT INTO "quaint"."new_User" ("createdAt", "email", "id", "name", "password") SELECT "createdAt", "email", "id", "name", "password" FROM "quaint"."User"

DROP TABLE "quaint"."User";

ALTER TABLE "quaint"."new_User" RENAME TO "User";

CREATE UNIQUE INDEX "quaint"."User.email" ON "User"("email")

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200217204455-init..20200217223245-init
--- datamodel.dml
+++ datamodel.dml
@@ -3,17 +3,18 @@
 }
 datasource db {
     provider = "sqlite"
-    url = "***"
+    url      = "sqlite:./dev.db"
 }
 model User {
     createdAt DateTime @default(now())
     email     String   @unique
     id        Int      @default(autoincrement()) @id
     name      String?
     password  String
+    active    Boolean
     brands    Brand[]  @relation(name: "BrandUsers")
 }
 model Brand {
```


