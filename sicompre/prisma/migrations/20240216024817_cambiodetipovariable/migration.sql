/*
  Warnings:

  - The primary key for the `GrupoBien` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `GrupoBien` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `grupoBienId` on the `Bien` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Bien" DROP CONSTRAINT "Bien_grupoBienId_fkey";

-- AlterTable
ALTER TABLE "Bien" DROP COLUMN "grupoBienId",
ADD COLUMN     "grupoBienId" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "GrupoBien" DROP CONSTRAINT "GrupoBien_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
ADD CONSTRAINT "GrupoBien_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Bien" ADD CONSTRAINT "Bien_grupoBienId_fkey" FOREIGN KEY ("grupoBienId") REFERENCES "GrupoBien"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
