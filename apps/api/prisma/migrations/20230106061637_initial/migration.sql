-- CreateTable
CREATE TABLE "accounting_entries" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "side_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "accounting_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounting_items" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type_id" INTEGER NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),
    "selectable" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "accounting_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounting_sides" (
    "id" INTEGER,
    "name" VARCHAR(255) NOT NULL,
    "deleted_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6)
);

-- CreateTable
CREATE TABLE "accounting_transactions" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "date" TIMESTAMP(6) NOT NULL,
    "description" VARCHAR(255),
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "accounting_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounting_types" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "side_id" INTEGER NOT NULL,
    "deleted_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "accounting_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_settings" (
    "user_id" INTEGER NOT NULL,
    "debit_item_id" INTEGER NOT NULL,
    "credit_item_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "inventory_settings_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "schema_migrations" (
    "version" VARCHAR(255) NOT NULL
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "provider" VARCHAR(255) NOT NULL,
    "uid" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255),
    "image_url" VARCHAR(255),
    "email" VARCHAR(255),
    "access_token" VARCHAR(255),
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "index_accounting_entries_on_item_id" ON "accounting_entries"("item_id");

-- CreateIndex
CREATE INDEX "index_accounting_entries_on_side_id" ON "accounting_entries"("side_id");

-- CreateIndex
CREATE INDEX "index_accounting_entries_on_transaction_id" ON "accounting_entries"("transaction_id");

-- CreateIndex
CREATE INDEX "index_accounting_entries_on_user_id" ON "accounting_entries"("user_id");

-- CreateIndex
CREATE INDEX "index_accounting_entries_on_user_id_and_item_id_and_side_id" ON "accounting_entries"("user_id", "item_id", "side_id");

-- CreateIndex
CREATE INDEX "index_accounting_items_on_type_id" ON "accounting_items"("type_id");

-- CreateIndex
CREATE INDEX "index_accounting_items_on_user_id" ON "accounting_items"("user_id");

-- CreateIndex
CREATE INDEX "index_accounting_transactions_on_date" ON "accounting_transactions"("date");

-- CreateIndex
CREATE INDEX "index_accounting_transactions_on_user_id" ON "accounting_transactions"("user_id");

-- CreateIndex
CREATE INDEX "index_accounting_types_on_side_id" ON "accounting_types"("side_id");

-- CreateIndex
CREATE UNIQUE INDEX "unique_schema_migrations" ON "schema_migrations"("version");
