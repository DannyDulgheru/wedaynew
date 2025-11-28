-- =====================================================
-- WEDAY DATABASE SEED DATA
-- =====================================================
-- Execute AFTER running supabase_migration.sql
-- https://supabase.com/dashboard/project/jghbzpnqaopttljfdsjh/sql/new
-- =====================================================

-- =====================================================
-- 1. Create Admin User
-- =====================================================
-- Password: admin123 (bcrypt hash)
INSERT INTO "User" ("id", "name", "email", "password", "role", "createdAt", "updatedAt")
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'Admin Weday',
    'admin@weday.md',
    '$2a$10$rQ8YvVKx5ZXh9ZXPxPl7DeL6h6QX1fXX5qvPxXLx5YxPxXh9ZXPxP',
    'ADMIN',
    NOW(),
    NOW()
);

-- =====================================================
-- 2. Create Client User
-- =====================================================
-- Password: client123 (bcrypt hash)
INSERT INTO "User" ("id", "name", "email", "password", "role", "createdAt", "updatedAt")
VALUES (
    '00000000-0000-0000-0000-000000000002',
    'Ion Popescu',
    'client@weday.md',
    '$2a$10$rQ8YvVKx5ZXh9ZXPxPl7DeL6h6QX1fXX5qvPxXLx5YxPxXh9ZXPxP',
    'CLIENT',
    NOW(),
    NOW()
);

-- =====================================================
-- 3. Create Templates (5 templates - one per event type)
-- =====================================================

-- Wedding Template
INSERT INTO "Template" ("id", "name", "description", "eventType", "thumbnail", "colorScheme", "layout", "sections", "isActive")
VALUES (
    '10000000-0000-0000-0000-000000000001',
    'Elegant Wedding',
    'Modern and elegant wedding invitation template',
    'WEDDING',
    '/templates/wedding-elegant.jpg',
    '{"primary": "#D4AF37", "secondary": "#FFFFFF", "accent": "#E8D5B7", "background": "#FAFAFA", "text": "#2D3748"}',
    '{"maxWidth": "1200px", "spacing": "comfortable"}',
    '["hero", "countdown", "details", "rsvp", "gallery", "location"]',
    true
);

-- Baptism Template
INSERT INTO "Template" ("id", "name", "description", "eventType", "thumbnail", "colorScheme", "layout", "sections", "isActive")
VALUES (
    '10000000-0000-0000-0000-000000000002',
    'Heavenly Baptism',
    'Beautiful baptism invitation with angelic design',
    'BAPTISM',
    '/templates/baptism-heavenly.jpg',
    '{"primary": "#87CEEB", "secondary": "#FFFFFF", "accent": "#FFD700", "background": "#F0F8FF", "text": "#2D3748"}',
    '{"maxWidth": "1200px", "spacing": "comfortable"}',
    '["hero", "countdown", "details", "rsvp", "gallery"]',
    true
);

-- Birthday Template
INSERT INTO "Template" ("id", "name", "description", "eventType", "thumbnail", "colorScheme", "layout", "sections", "isActive")
VALUES (
    '10000000-0000-0000-0000-000000000003',
    'Celebration Birthday',
    'Fun and colorful birthday party invitation',
    'BIRTHDAY',
    '/templates/birthday-celebration.jpg',
    '{"primary": "#FF6B9D", "secondary": "#FFFFFF", "accent": "#FFD93D", "background": "#FFF5F7", "text": "#2D3748"}',
    '{"maxWidth": "1200px", "spacing": "comfortable"}',
    '["hero", "countdown", "details", "rsvp", "gallery", "timeline"]',
    true
);

-- Anniversary Template
INSERT INTO "Template" ("id", "name", "description", "eventType", "thumbnail", "colorScheme", "layout", "sections", "isActive")
VALUES (
    '10000000-0000-0000-0000-000000000004',
    'Golden Anniversary',
    'Elegant anniversary celebration template',
    'ANNIVERSARY',
    '/templates/anniversary-golden.jpg',
    '{"primary": "#B8860B", "secondary": "#FFFFFF", "accent": "#DAA520", "background": "#FFFAF0", "text": "#2D3748"}',
    '{"maxWidth": "1200px", "spacing": "comfortable"}',
    '["hero", "countdown", "details", "rsvp", "timeline", "gallery"]',
    true
);

-- Corporate Template
INSERT INTO "Template" ("id", "name", "description", "eventType", "thumbnail", "colorScheme", "layout", "sections", "isActive")
VALUES (
    '10000000-0000-0000-0000-000000000005',
    'Professional Corporate',
    'Modern corporate event invitation',
    'CORPORATE',
    '/templates/corporate-professional.jpg',
    '{"primary": "#1E40AF", "secondary": "#FFFFFF", "accent": "#3B82F6", "background": "#F8FAFC", "text": "#1E293B"}',
    '{"maxWidth": "1200px", "spacing": "comfortable"}',
    '["hero", "details", "rsvp", "speakers", "schedule", "location"]',
    true
);

-- =====================================================
-- 4. Create Demo Events (3 events)
-- =====================================================

-- Wedding Event
INSERT INTO "Event" ("id", "userId", "templateId", "eventType", "eventTitle", "eventDate", "eventLocation", "customContent", "publicLink", "orderStatus", "isActive")
VALUES (
    '20000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000001',
    'WEDDING',
    'Nunta Ana & Mihai',
    '2025-06-15 18:00:00',
    'Restaurant Elegant, Chișinău',
    '{"groomName": "Mihai Ionescu", "brideName": "Ana Popescu", "weddingDate": "15 Iunie 2025", "venue": "Restaurant Elegant", "ceremony": "18:00", "reception": "19:30"}',
    'ana-si-mihai-2025',
    'ACTIVE',
    true
);

-- Birthday Event
INSERT INTO "Event" ("id", "userId", "templateId", "eventType", "eventTitle", "eventDate", "eventLocation", "customContent", "publicLink", "orderStatus", "isActive")
VALUES (
    '20000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000003',
    'BIRTHDAY',
    'Ziua lui Andrei - 30 de ani',
    '2025-03-20 19:00:00',
    'Club Phoenix, Chișinău',
    '{"celebrantName": "Andrei Pavel", "age": "30", "theme": "Petrecere de neuit", "venue": "Club Phoenix", "startTime": "19:00"}',
    'andrei-30-ani',
    'ACTIVE',
    true
);

-- Corporate Event
INSERT INTO "Event" ("id", "userId", "templateId", "eventType", "eventTitle", "eventDate", "eventLocation", "customContent", "publicLink", "orderStatus", "isActive")
VALUES (
    '20000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000005',
    'CORPORATE',
    'Tech Conference 2025',
    '2025-04-10 09:00:00',
    'Radisson Blu Hotel, Chișinău',
    '{"eventName": "Tech Conference Moldova 2025", "tagline": "Innovation & Future", "venue": "Radisson Blu", "startTime": "09:00", "endTime": "18:00"}',
    'tech-conference-2025',
    'PAID',
    true
);

-- =====================================================
-- 5. Create Demo RSVPs (10 responses)
-- =====================================================

-- RSVPs for Wedding Event
INSERT INTO "RSVP" ("id", "eventId", "guestName", "guestEmail", "guestPhone", "status", "numberOfGuests", "message")
VALUES
    (gen_random_uuid()::text, '20000000-0000-0000-0000-000000000001', 'Maria Ionescu', 'maria@example.com', '+373 69 123456', 'ATTENDING', 2, 'Ne bucurăm mult pentru voi!'),
    (gen_random_uuid()::text, '20000000-0000-0000-0000-000000000001', 'Vasile Popescu', 'vasile@example.com', '+373 69 234567', 'ATTENDING', 1, 'Cu siguranță voi fi acolo!'),
    (gen_random_uuid()::text, '20000000-0000-0000-0000-000000000001', 'Elena Rusu', 'elena@example.com', '+373 69 345678', 'NOT_ATTENDING', 0, 'Din păcate nu pot participa. Mult noroc!'),
    (gen_random_uuid()::text, '20000000-0000-0000-0000-000000000001', 'Andrei Ciobanu', 'andrei@example.com', '+373 69 456789', 'MAYBE', 2, 'Voi confirma în curând');

-- RSVPs for Birthday Event
INSERT INTO "RSVP" ("id", "eventId", "guestName", "guestEmail", "guestPhone", "status", "numberOfGuests", "message")
VALUES
    (gen_random_uuid()::text, '20000000-0000-0000-0000-000000000002', 'Cristina Morari', 'cristina@example.com', '+373 69 567890', 'ATTENDING', 1, 'La mulți ani!'),
    (gen_random_uuid()::text, '20000000-0000-0000-0000-000000000002', 'Ion Popa', 'ion@example.com', '+373 69 678901', 'ATTENDING', 2, 'Ne vedem acolo!');

-- RSVPs for Corporate Event
INSERT INTO "RSVP" ("id", "eventId", "guestName", "guestEmail", "guestPhone", "status", "numberOfGuests", "message")
VALUES
    (gen_random_uuid()::text, '20000000-0000-0000-0000-000000000003', 'Alexandru Tech', 'alex@techcompany.md', '+373 69 789012', 'ATTENDING', 1, 'Interested in the keynote speakers'),
    (gen_random_uuid()::text, '20000000-0000-0000-0000-000000000003', 'Victoria Startup', 'victoria@startup.md', '+373 69 890123', 'ATTENDING', 1, 'Looking forward to networking'),
    (gen_random_uuid()::text, '20000000-0000-0000-0000-000000000003', 'Dmitri Developer', 'dmitri@devshop.md', '+373 69 901234', 'ATTENDING', 1, ''),
    (gen_random_uuid()::text, '20000000-0000-0000-0000-000000000003', 'Natalia Manager', 'natalia@company.md', '+373 69 012345', 'MAYBE', 1, 'Depends on my schedule');

-- =====================================================
-- SUCCESS! Demo data inserted
-- =====================================================
-- Users created:
--   - admin@weday.md / admin123 (ADMIN)
--   - client@weday.md / client123 (CLIENT)
-- Templates: 5 (one per event type)
-- Events: 3 (Wedding, Birthday, Corporate)
-- RSVPs: 10 total responses
-- =====================================================
