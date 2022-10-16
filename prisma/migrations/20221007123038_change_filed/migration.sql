/*
  Warnings:

  - You are about to drop the column `sort` on the `article` table. All the data in the column will be lost.
  - Added the required column `order` to the `article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `article` DROP COLUMN `sort`,
    ADD COLUMN `order` INTEGER NOT NULL;
