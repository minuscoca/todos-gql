CREATE TABLE IF NOT EXISTS "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"completed" boolean DEFAULT false NOT NULL
);
