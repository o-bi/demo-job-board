import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('candidate', 'employer', 'admin');
  CREATE TYPE "public"."enum_jobs_category" AS ENUM('it', 'finance', 'healthcare', 'manufacturing', 'retail', 'marketing', 'education', 'consulting', 'hospitality', 'logistics', 'construction', 'admin', 'hr', 'legal', 'other');
  CREATE TYPE "public"."enum_jobs_experience_level" AS ENUM('junior', 'regular', 'senior', 'lead');
  CREATE TYPE "public"."enum_jobs_location_canton" AS ENUM('ZH', 'BE', 'LU', 'UR', 'SZ', 'OW', 'NW', 'GL', 'ZG', 'FR', 'SO', 'BS', 'BL', 'SH', 'AR', 'AI', 'SG', 'GR', 'AG', 'TG', 'TI', 'VD', 'VS', 'NE', 'GE', 'JU');
  CREATE TYPE "public"."enum_jobs_employment_type" AS ENUM('permanent', 'temporary', 'freelance', 'internship', 'apprenticeship');
  CREATE TYPE "public"."enum_jobs_work_model" AS ENUM('onsite', 'hybrid', 'remote');
  CREATE TYPE "public"."enum_jobs_status" AS ENUM('draft', 'active', 'expired', 'closed');
  CREATE TYPE "public"."enum_companies_industry" AS ENUM('it', 'finance', 'healthcare', 'manufacturing', 'retail', 'marketing', 'education', 'consulting', 'hospitality', 'logistics', 'construction', 'other');
  CREATE TYPE "public"."enum_companies_size" AS ENUM('1-10', '11-50', '51-200', '201-500', '501-1000', '1000+');
  CREATE TYPE "public"."enum_companies_location_canton" AS ENUM('ZH', 'BE', 'LU', 'UR', 'SZ', 'OW', 'NW', 'GL', 'ZG', 'FR', 'SO', 'BS', 'BL', 'SH', 'AR', 'AI', 'SG', 'GR', 'AG', 'TG', 'TI', 'VD', 'VS', 'NE', 'GE', 'JU');
  CREATE TYPE "public"."enum_applications_status" AS ENUM('new', 'reviewed', 'interview', 'offer', 'rejected', 'hired', 'withdrawn');
  CREATE TYPE "public"."enum_candidate_profiles_skills_level" AS ENUM('beginner', 'intermediate', 'expert');
  CREATE TYPE "public"."enum_candidate_profiles_languages_level" AS ENUM('basic', 'intermediate', 'fluent', 'native');
  CREATE TYPE "public"."enum_candidate_profiles_preferences_work_models" AS ENUM('onsite', 'hybrid', 'remote');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar,
  	"last_name" varchar,
  	"role" "enum_users_role" DEFAULT 'candidate' NOT NULL,
  	"company_id" integer,
  	"phone" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "jobs_skills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"skill" varchar
  );
  
  CREATE TABLE "jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"company_id" integer NOT NULL,
  	"description" jsonb NOT NULL,
  	"short_description" varchar,
  	"category" "enum_jobs_category" NOT NULL,
  	"external_id" varchar,
  	"experience_level" "enum_jobs_experience_level",
  	"location_city" varchar NOT NULL,
  	"location_canton" "enum_jobs_location_canton" NOT NULL,
  	"location_address" varchar,
  	"location_postal_code" varchar,
  	"location_latitude" numeric,
  	"location_longitude" numeric,
  	"employment_type" "enum_jobs_employment_type" NOT NULL,
  	"workload_min" numeric DEFAULT 80,
  	"workload_max" numeric DEFAULT 100,
  	"work_model" "enum_jobs_work_model",
  	"salary_min" numeric,
  	"salary_max" numeric,
  	"salary_is_public" boolean DEFAULT false,
  	"responsibilities" jsonb,
  	"requirements" jsonb,
  	"benefits" jsonb,
  	"application_url" varchar,
  	"application_email" varchar,
  	"status" "enum_jobs_status" DEFAULT 'draft' NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone,
  	"featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "companies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"logo_id" integer,
  	"logo_url" varchar,
  	"description" jsonb,
  	"website" varchar,
  	"industry" "enum_companies_industry",
  	"size" "enum_companies_size",
  	"location_city" varchar,
  	"location_canton" "enum_companies_location_canton",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "applications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"job_id" integer NOT NULL,
  	"candidate_id" integer NOT NULL,
  	"status" "enum_applications_status" DEFAULT 'new' NOT NULL,
  	"message" varchar,
  	"cv_id" integer,
  	"cover_letter_id" integer,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "candidate_profiles_experiences" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"company" varchar NOT NULL,
  	"location" varchar,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone,
  	"current" boolean,
  	"description" varchar
  );
  
  CREATE TABLE "candidate_profiles_education" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"degree" varchar NOT NULL,
  	"institution" varchar NOT NULL,
  	"field" varchar,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone
  );
  
  CREATE TABLE "candidate_profiles_skills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"level" "enum_candidate_profiles_skills_level"
  );
  
  CREATE TABLE "candidate_profiles_languages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"language" varchar NOT NULL,
  	"level" "enum_candidate_profiles_languages_level"
  );
  
  CREATE TABLE "candidate_profiles_preferences_desired_locations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"location" varchar
  );
  
  CREATE TABLE "candidate_profiles_preferences_work_models" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_candidate_profiles_preferences_work_models",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "candidate_profiles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"summary" varchar,
  	"preferences_desired_role" varchar,
  	"preferences_desired_salary" numeric,
  	"preferences_desired_workload_min" numeric,
  	"preferences_desired_workload_max" numeric,
  	"preferences_available_from" timestamp(3) with time zone,
  	"cv_file_id" integer,
  	"is_public" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"jobs_id" integer,
  	"companies_id" integer,
  	"media_id" integer,
  	"applications_id" integer,
  	"candidate_profiles_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "jobs_skills" ADD CONSTRAINT "jobs_skills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "jobs" ADD CONSTRAINT "jobs_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "companies" ADD CONSTRAINT "companies_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "applications" ADD CONSTRAINT "applications_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "applications" ADD CONSTRAINT "applications_candidate_id_users_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "applications" ADD CONSTRAINT "applications_cv_id_media_id_fk" FOREIGN KEY ("cv_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "applications" ADD CONSTRAINT "applications_cover_letter_id_media_id_fk" FOREIGN KEY ("cover_letter_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "candidate_profiles_experiences" ADD CONSTRAINT "candidate_profiles_experiences_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."candidate_profiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "candidate_profiles_education" ADD CONSTRAINT "candidate_profiles_education_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."candidate_profiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "candidate_profiles_skills" ADD CONSTRAINT "candidate_profiles_skills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."candidate_profiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "candidate_profiles_languages" ADD CONSTRAINT "candidate_profiles_languages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."candidate_profiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "candidate_profiles_preferences_desired_locations" ADD CONSTRAINT "candidate_profiles_preferences_desired_locations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."candidate_profiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "candidate_profiles_preferences_work_models" ADD CONSTRAINT "candidate_profiles_preferences_work_models_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."candidate_profiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "candidate_profiles" ADD CONSTRAINT "candidate_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "candidate_profiles" ADD CONSTRAINT "candidate_profiles_cv_file_id_media_id_fk" FOREIGN KEY ("cv_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_companies_fk" FOREIGN KEY ("companies_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_applications_fk" FOREIGN KEY ("applications_id") REFERENCES "public"."applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_candidate_profiles_fk" FOREIGN KEY ("candidate_profiles_id") REFERENCES "public"."candidate_profiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_company_idx" ON "users" USING btree ("company_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "jobs_skills_order_idx" ON "jobs_skills" USING btree ("_order");
  CREATE INDEX "jobs_skills_parent_id_idx" ON "jobs_skills" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "jobs_slug_idx" ON "jobs" USING btree ("slug");
  CREATE INDEX "jobs_company_idx" ON "jobs" USING btree ("company_id");
  CREATE UNIQUE INDEX "jobs_external_id_idx" ON "jobs" USING btree ("external_id");
  CREATE INDEX "jobs_updated_at_idx" ON "jobs" USING btree ("updated_at");
  CREATE INDEX "jobs_created_at_idx" ON "jobs" USING btree ("created_at");
  CREATE UNIQUE INDEX "companies_slug_idx" ON "companies" USING btree ("slug");
  CREATE INDEX "companies_logo_idx" ON "companies" USING btree ("logo_id");
  CREATE INDEX "companies_updated_at_idx" ON "companies" USING btree ("updated_at");
  CREATE INDEX "companies_created_at_idx" ON "companies" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "applications_job_idx" ON "applications" USING btree ("job_id");
  CREATE INDEX "applications_candidate_idx" ON "applications" USING btree ("candidate_id");
  CREATE INDEX "applications_cv_idx" ON "applications" USING btree ("cv_id");
  CREATE INDEX "applications_cover_letter_idx" ON "applications" USING btree ("cover_letter_id");
  CREATE INDEX "applications_updated_at_idx" ON "applications" USING btree ("updated_at");
  CREATE INDEX "applications_created_at_idx" ON "applications" USING btree ("created_at");
  CREATE INDEX "candidate_profiles_experiences_order_idx" ON "candidate_profiles_experiences" USING btree ("_order");
  CREATE INDEX "candidate_profiles_experiences_parent_id_idx" ON "candidate_profiles_experiences" USING btree ("_parent_id");
  CREATE INDEX "candidate_profiles_education_order_idx" ON "candidate_profiles_education" USING btree ("_order");
  CREATE INDEX "candidate_profiles_education_parent_id_idx" ON "candidate_profiles_education" USING btree ("_parent_id");
  CREATE INDEX "candidate_profiles_skills_order_idx" ON "candidate_profiles_skills" USING btree ("_order");
  CREATE INDEX "candidate_profiles_skills_parent_id_idx" ON "candidate_profiles_skills" USING btree ("_parent_id");
  CREATE INDEX "candidate_profiles_languages_order_idx" ON "candidate_profiles_languages" USING btree ("_order");
  CREATE INDEX "candidate_profiles_languages_parent_id_idx" ON "candidate_profiles_languages" USING btree ("_parent_id");
  CREATE INDEX "candidate_profiles_preferences_desired_locations_order_idx" ON "candidate_profiles_preferences_desired_locations" USING btree ("_order");
  CREATE INDEX "candidate_profiles_preferences_desired_locations_parent_id_idx" ON "candidate_profiles_preferences_desired_locations" USING btree ("_parent_id");
  CREATE INDEX "candidate_profiles_preferences_work_models_order_idx" ON "candidate_profiles_preferences_work_models" USING btree ("order");
  CREATE INDEX "candidate_profiles_preferences_work_models_parent_idx" ON "candidate_profiles_preferences_work_models" USING btree ("parent_id");
  CREATE UNIQUE INDEX "candidate_profiles_user_idx" ON "candidate_profiles" USING btree ("user_id");
  CREATE INDEX "candidate_profiles_cv_file_idx" ON "candidate_profiles" USING btree ("cv_file_id");
  CREATE INDEX "candidate_profiles_updated_at_idx" ON "candidate_profiles" USING btree ("updated_at");
  CREATE INDEX "candidate_profiles_created_at_idx" ON "candidate_profiles" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("jobs_id");
  CREATE INDEX "payload_locked_documents_rels_companies_id_idx" ON "payload_locked_documents_rels" USING btree ("companies_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_applications_id_idx" ON "payload_locked_documents_rels" USING btree ("applications_id");
  CREATE INDEX "payload_locked_documents_rels_candidate_profiles_id_idx" ON "payload_locked_documents_rels" USING btree ("candidate_profiles_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "jobs_skills" CASCADE;
  DROP TABLE "jobs" CASCADE;
  DROP TABLE "companies" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "applications" CASCADE;
  DROP TABLE "candidate_profiles_experiences" CASCADE;
  DROP TABLE "candidate_profiles_education" CASCADE;
  DROP TABLE "candidate_profiles_skills" CASCADE;
  DROP TABLE "candidate_profiles_languages" CASCADE;
  DROP TABLE "candidate_profiles_preferences_desired_locations" CASCADE;
  DROP TABLE "candidate_profiles_preferences_work_models" CASCADE;
  DROP TABLE "candidate_profiles" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_jobs_category";
  DROP TYPE "public"."enum_jobs_experience_level";
  DROP TYPE "public"."enum_jobs_location_canton";
  DROP TYPE "public"."enum_jobs_employment_type";
  DROP TYPE "public"."enum_jobs_work_model";
  DROP TYPE "public"."enum_jobs_status";
  DROP TYPE "public"."enum_companies_industry";
  DROP TYPE "public"."enum_companies_size";
  DROP TYPE "public"."enum_companies_location_canton";
  DROP TYPE "public"."enum_applications_status";
  DROP TYPE "public"."enum_candidate_profiles_skills_level";
  DROP TYPE "public"."enum_candidate_profiles_languages_level";
  DROP TYPE "public"."enum_candidate_profiles_preferences_work_models";`)
}
