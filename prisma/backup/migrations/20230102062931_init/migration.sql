-- CreateTable
CREATE TABLE "Student" (
    "id" BIGINT NOT NULL,
    "name" TEXT,
    "section" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_id_key" ON "Student"("id");
