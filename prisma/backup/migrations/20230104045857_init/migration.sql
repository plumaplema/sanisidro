/*
  Warnings:

  - You are about to drop the column `id` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `section` on the `Student` table. All the data in the column will be lost.
  - Added the required column `FirstName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LastName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Lrn` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Score` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Section" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Section" TEXT NOT NULL,
    "Adviser" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "Lrn" BIGINT NOT NULL PRIMARY KEY,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Score" INTEGER NOT NULL,
    "sectionId" INTEGER,
    CONSTRAINT "Student_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_Lrn_key" ON "Student"("Lrn");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Section_id_key" ON "Section"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Section_Section_key" ON "Section"("Section");
