-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_categoryId_fkey";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "brandId" INTEGER;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;
