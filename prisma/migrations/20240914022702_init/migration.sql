-- CreateTable
CREATE TABLE "Restaurant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "ratingCount" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "priceRange" TEXT NOT NULL,
    "images" TEXT[],
    "featured" JSONB NOT NULL,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);
