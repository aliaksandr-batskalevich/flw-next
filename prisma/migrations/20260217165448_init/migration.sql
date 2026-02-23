-- CreateTable
CREATE TABLE "Flower" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subName" TEXT,
    "color" TEXT NOT NULL,
    "colorDescription" TEXT,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "isSale" BOOLEAN NOT NULL,
    "isHit" BOOLEAN NOT NULL,
    "isLittleLeft" BOOLEAN NOT NULL,
    "smallPhoto" TEXT NOT NULL,
    "largePhoto" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Flower_pkey" PRIMARY KEY ("id")
);
