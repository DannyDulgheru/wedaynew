-- =====================================================
-- WEDAY DATABASE SCHEMA - Supabase SQL Migration
-- =====================================================
-- Execute this in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/jghbzpnqaopttljfdsjh/sql/new
-- =====================================================

-- Create ENUMs
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'CLIENT');
CREATE TYPE "EventType" AS ENUM ('WEDDING', 'BAPTISM', 'BIRTHDAY', 'ANNIVERSARY', 'CORPORATE');
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'ACTIVE', 'EXPIRED');
CREATE TYPE "RSVPStatus" AS ENUM ('ATTENDING', 'NOT_ATTENDING', 'MAYBE');

-- =====================================================
-- User Table
-- =====================================================
CREATE TABLE "User" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "name" TEXT,
    "email" TEXT UNIQUE NOT NULL,
    "emailVerified" TIMESTAMP,
    "password" TEXT NOT NULL,
    "role" "UserRole" DEFAULT 'CLIENT' NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX "User_email_idx" ON "User"("email");

-- =====================================================
-- Account Table (NextAuth)
-- =====================================================
CREATE TABLE "Account" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE,
    CONSTRAINT "Account_provider_providerAccountId_key" UNIQUE ("provider", "providerAccountId")
);

CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- =====================================================
-- Session Table (NextAuth)
-- =====================================================
CREATE TABLE "Session" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "sessionToken" TEXT UNIQUE NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
);

CREATE INDEX "Session_userId_idx" ON "Session"("userId");
CREATE INDEX "Session_sessionToken_idx" ON "Session"("sessionToken");

-- =====================================================
-- VerificationToken Table (NextAuth)
-- =====================================================
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT UNIQUE NOT NULL,
    "expires" TIMESTAMP NOT NULL,
    CONSTRAINT "VerificationToken_identifier_token_key" UNIQUE ("identifier", "token")
);

CREATE INDEX "VerificationToken_token_idx" ON "VerificationToken"("token");

-- =====================================================
-- Template Table
-- =====================================================
CREATE TABLE "Template" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "eventType" "EventType" NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "previewUrl" TEXT,
    "colorScheme" JSONB NOT NULL,
    "layout" JSONB NOT NULL,
    "sections" JSONB NOT NULL,
    "isActive" BOOLEAN DEFAULT true NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX "Template_eventType_idx" ON "Template"("eventType");
CREATE INDEX "Template_isActive_idx" ON "Template"("isActive");

-- =====================================================
-- Event Table
-- =====================================================
CREATE TABLE "Event" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "eventType" "EventType" NOT NULL,
    "eventTitle" TEXT NOT NULL,
    "eventDate" TIMESTAMP NOT NULL,
    "eventLocation" TEXT,
    "customContent" JSONB NOT NULL,
    "publicLink" TEXT UNIQUE NOT NULL,
    "orderStatus" "OrderStatus" DEFAULT 'PENDING' NOT NULL,
    "paymentDate" TIMESTAMP,
    "expiryDate" TIMESTAMP,
    "isActive" BOOLEAN DEFAULT true NOT NULL,
    "views" INTEGER DEFAULT 0 NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE,
    CONSTRAINT "Event_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id")
);

CREATE INDEX "Event_userId_idx" ON "Event"("userId");
CREATE INDEX "Event_templateId_idx" ON "Event"("templateId");
CREATE INDEX "Event_publicLink_idx" ON "Event"("publicLink");
CREATE INDEX "Event_eventDate_idx" ON "Event"("eventDate");

-- =====================================================
-- RSVP Table
-- =====================================================
CREATE TABLE "RSVP" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "eventId" TEXT NOT NULL,
    "guestName" TEXT NOT NULL,
    "guestEmail" TEXT,
    "guestPhone" TEXT,
    "status" "RSVPStatus" NOT NULL,
    "numberOfGuests" INTEGER DEFAULT 1 NOT NULL,
    "message" TEXT,
    "dietaryRestrictions" TEXT,
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    CONSTRAINT "RSVP_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE
);

CREATE INDEX "RSVP_eventId_idx" ON "RSVP"("eventId");
CREATE INDEX "RSVP_status_idx" ON "RSVP"("status");

-- =====================================================
-- SiteSettings Table
-- =====================================================
CREATE TABLE "SiteSettings" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "siteName" TEXT DEFAULT 'Weday' NOT NULL,
    "siteDescription" TEXT,
    "logo" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "socialLinks" JSONB,
    "packagePrice" INTEGER DEFAULT 999 NOT NULL,
    "currency" TEXT DEFAULT 'MDL' NOT NULL,
    "featuresEnabled" JSONB,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
);

-- =====================================================
-- Insert Default Settings
-- =====================================================
INSERT INTO "SiteSettings" ("id", "siteName", "packagePrice", "currency")
VALUES (gen_random_uuid()::text, 'Weday', 999, 'MDL');

-- =====================================================
-- Create Update Triggers for updatedAt
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_updated_at BEFORE UPDATE ON "User"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_template_updated_at BEFORE UPDATE ON "Template"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_event_updated_at BEFORE UPDATE ON "Event"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rsvp_updated_at BEFORE UPDATE ON "RSVP"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sitesettings_updated_at BEFORE UPDATE ON "SiteSettings"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SUCCESS! Tables created successfully
-- =====================================================
