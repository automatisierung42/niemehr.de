-- CreateEnum
CREATE TYPE "ResponseStatus" AS ENUM ('PENDING', 'READY_TO_APPROVE', 'APPROVED_PENDING', 'POSTED', 'SKIP_MANUAL');

-- CreateTable
CREATE TABLE "businesses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "googlePlaceId" TEXT NOT NULL,
    "ratingBoost" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "lastSyncAt" TIMESTAMP(3),

    CONSTRAINT "businesses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "googleReviewId" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "text" TEXT,
    "time" TIMESTAMP(3) NOT NULL,
    "responseStatus" "ResponseStatus" NOT NULL DEFAULT 'PENDING',
    "kiSummary" TEXT,
    "kiResponseText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "languageCode" TEXT NOT NULL DEFAULT 'de',

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "businesses_googlePlaceId_key" ON "businesses"("googlePlaceId");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_googleReviewId_key" ON "reviews"("googleReviewId");

-- CreateIndex
CREATE INDEX "reviews_businessId_idx" ON "reviews"("businessId");

-- CreateIndex
CREATE INDEX "reviews_responseStatus_idx" ON "reviews"("responseStatus");

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
