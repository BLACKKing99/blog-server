/*
  Warnings:

  - You are about to drop the `backcomment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `backcomment` DROP FOREIGN KEY `backcomment_commentId_fkey`;

-- DropForeignKey
ALTER TABLE `backcomment` DROP FOREIGN KEY `backcomment_userId_fkey`;

-- AlterTable
ALTER TABLE `comment` ADD COLUMN `pid` INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `backcomment`;
