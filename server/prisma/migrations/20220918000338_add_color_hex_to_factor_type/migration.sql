/*
  Warnings:

  - Added the required column `colorHex` to the `FactorType` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FactorType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "pluralName" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "colorHex" TEXT NOT NULL
);
INSERT INTO "new_FactorType" ("id", "name", "pluralName", "symbol") SELECT "id", "name", "pluralName", "symbol" FROM "FactorType";
DROP TABLE "FactorType";
ALTER TABLE "new_FactorType" RENAME TO "FactorType";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
