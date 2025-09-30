CREATE TABLE "appointments" (
	"id" serial PRIMARY KEY NOT NULL,
	"treatment_id" integer,
	"appointment_date" date NOT NULL,
	"appointment_time" time NOT NULL,
	"duration" integer NOT NULL,
	"client_name" varchar(255) NOT NULL,
	"client_email" varchar(255) NOT NULL,
	"client_phone" varchar(50) NOT NULL,
	"message" text,
	"status" varchar(50) DEFAULT 'pending',
	"google_calendar_event_id" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "availability_rules" (
	"id" serial PRIMARY KEY NOT NULL,
	"day_of_week" integer NOT NULL,
	"start_time" time NOT NULL,
	"end_time" time NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "blocked_slots" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"start_time" time NOT NULL,
	"end_time" time NOT NULL,
	"reason" varchar(255),
	"google_calendar_event_id" varchar(255),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "recurring_blocks" (
	"id" serial PRIMARY KEY NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"reason" varchar(255),
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "treatments" (
	"id" serial PRIMARY KEY NOT NULL,
	"value" varchar(100) NOT NULL,
	"label" varchar(200) NOT NULL,
	"duration" integer NOT NULL,
	"price" numeric(10, 2),
	"active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "treatments_value_unique" UNIQUE("value")
);
--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_treatment_id_treatments_id_fk" FOREIGN KEY ("treatment_id") REFERENCES "public"."treatments"("id") ON DELETE no action ON UPDATE no action;