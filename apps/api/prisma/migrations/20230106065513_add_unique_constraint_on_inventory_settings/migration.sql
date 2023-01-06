/*
  Warnings:

  - You are about to drop the `accounting_sides` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `schema_migrations` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[debit_item_id]` on the table `inventory_settings` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[credit_item_id]` on the table `inventory_settings` will be added. If there are existing duplicate values, this will fail.

*/
-- DropTable
DROP TABLE "accounting_sides";

-- DropTable
DROP TABLE "schema_migrations";

-- CreateIndex
CREATE UNIQUE INDEX "inventory_settings_debit_item_id_key" ON "inventory_settings"("debit_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "inventory_settings_credit_item_id_key" ON "inventory_settings"("credit_item_id");

-- AddForeignKey
ALTER TABLE "accounting_entries" ADD CONSTRAINT "accounting_entries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounting_entries" ADD CONSTRAINT "accounting_entries_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "accounting_transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounting_entries" ADD CONSTRAINT "accounting_entries_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "accounting_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounting_items" ADD CONSTRAINT "accounting_items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounting_items" ADD CONSTRAINT "accounting_items_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "accounting_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounting_transactions" ADD CONSTRAINT "accounting_transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_settings" ADD CONSTRAINT "inventory_settings_debit_item_id_fkey" FOREIGN KEY ("debit_item_id") REFERENCES "accounting_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_settings" ADD CONSTRAINT "inventory_settings_credit_item_id_fkey" FOREIGN KEY ("credit_item_id") REFERENCES "accounting_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
