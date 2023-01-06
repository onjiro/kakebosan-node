/*
  Warnings:

  - A unique constraint covering the columns `[provider,uid]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_provider_uid_key" ON "users"("provider", "uid");
