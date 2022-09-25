-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    CONSTRAINT "Project_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FactorType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "pluralName" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "colorHex" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Factor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "typeId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    CONSTRAINT "Factor_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "FactorType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Factor_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TagsOnFactors" (
    "factorId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    PRIMARY KEY ("factorId", "tagId"),
    CONSTRAINT "TagsOnFactors_factorId_fkey" FOREIGN KEY ("factorId") REFERENCES "Factor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TagsOnFactors_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "colorHex" TEXT NOT NULL
);
