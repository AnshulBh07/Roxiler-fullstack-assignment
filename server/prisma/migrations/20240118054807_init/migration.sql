-- CreateTable
CREATE TABLE "Products" (
    "product_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "category" VARCHAR NOT NULL,
    "image_url" VARCHAR NOT NULL,
    "sold" BOOLEAN NOT NULL DEFAULT false,
    "date_of_sale" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("product_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Products_product_id_key" ON "Products"("product_id");
