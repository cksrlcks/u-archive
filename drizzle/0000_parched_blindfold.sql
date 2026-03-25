CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"role" text DEFAULT 'user' NOT NULL,
	"approved" boolean DEFAULT false NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "work" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"image_url" text NOT NULL,
	"image_width" integer NOT NULL,
	"image_height" integer NOT NULL,
	"prompt" text NOT NULL,
	"platform" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "work_like" (
	"user_id" text NOT NULL,
	"work_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "work_like_user_id_work_id_pk" PRIMARY KEY("user_id","work_id")
);
--> statement-breakpoint
CREATE TABLE "work_tag" (
	"id" text PRIMARY KEY NOT NULL,
	"work_id" text NOT NULL,
	"tag" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ask" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ask_comment" (
	"id" text PRIMARY KEY NOT NULL,
	"ask_id" text NOT NULL,
	"user_id" text,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "work" ADD CONSTRAINT "work_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "work_like" ADD CONSTRAINT "work_like_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "work_like" ADD CONSTRAINT "work_like_work_id_work_id_fk" FOREIGN KEY ("work_id") REFERENCES "public"."work"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "work_tag" ADD CONSTRAINT "work_tag_work_id_work_id_fk" FOREIGN KEY ("work_id") REFERENCES "public"."work"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ask" ADD CONSTRAINT "ask_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ask_comment" ADD CONSTRAINT "ask_comment_ask_id_ask_id_fk" FOREIGN KEY ("ask_id") REFERENCES "public"."ask"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ask_comment" ADD CONSTRAINT "ask_comment_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;