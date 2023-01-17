-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "Lrn" BIGINT NOT NULL PRIMARY KEY,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Score" INTEGER NOT NULL DEFAULT 0,
    "sectionId" INTEGER,
    CONSTRAINT "Student_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Student" ("FirstName", "LastName", "Lrn", "Score", "sectionId") SELECT "FirstName", "LastName", "Lrn", "Score", "sectionId" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_Lrn_key" ON "Student"("Lrn");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
