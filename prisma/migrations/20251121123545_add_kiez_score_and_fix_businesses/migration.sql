-- 1. Fremdschlüssel temporär abschalten
ALTER TABLE "businesses" DROP CONSTRAINT IF EXISTS "businesses_userId_fkey";

-- 2. Spalten mit Defaults hinzufügen
ALTER TABLE "businesses" 
ADD COLUMN IF NOT EXISTS "phoneNumber" TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS "kiezScore" INTEGER DEFAULT 50;

-- 3. userId auf NULL setzen (weil wir keine gültige ID haben)
ALTER TABLE "businesses" ALTER COLUMN "userId" DROP NOT NULL;
UPDATE "businesses" SET "userId" = NULL WHERE "userId" IS NOT NULL;