/*
  Warnings:

  - You are about to drop the column `priview` on the `category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `article` ADD COLUMN `priview` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `priview`;
