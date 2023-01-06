/*
  Warnings:

  - Made the column `created_at` on table `accounting_entries` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `accounting_entries` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `accounting_items` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `accounting_items` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `accounting_sides` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `accounting_sides` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `accounting_transactions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `accounting_transactions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `accounting_types` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `accounting_types` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `inventory_settings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `inventory_settings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "accounting_entries" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "accounting_items" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "accounting_sides" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "accounting_transactions" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "accounting_types" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "inventory_settings" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET NOT NULL;
