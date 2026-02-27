-- Creación de la extensión para generar UUIDs en PostgreSQL
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tipo ENUM para los roles de usuario
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'users_role_enum') THEN
        CREATE TYPE "public"."users_role_enum" AS ENUM ('admin', 'user');
    END IF;
END $$;

-- Creación de la tabla users
CREATE TABLE IF NOT EXISTS public.users (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "name" character varying(100) NOT NULL,
    "email" character varying NOT NULL,
    "password" character varying NOT NULL,
    "role" "public"."users_role_enum" NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT "PK_users_id" PRIMARY KEY ("id"),
    CONSTRAINT "UQ_users_email" UNIQUE ("email")
);
