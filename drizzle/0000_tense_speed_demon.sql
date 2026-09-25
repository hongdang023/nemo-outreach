CREATE TABLE `activities` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`target_id` text NOT NULL,
	`kind` text NOT NULL,
	`detail` text DEFAULT '' NOT NULL,
	`occurred_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `targets` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`city` text NOT NULL,
	`website` text DEFAULT '' NOT NULL,
	`contact_role` text DEFAULT '' NOT NULL,
	`contact_channel` text DEFAULT '' NOT NULL,
	`value_prop` text DEFAULT '' NOT NULL,
	`next_action` text DEFAULT '' NOT NULL,
	`next_action_date` text DEFAULT 'Chưa đặt' NOT NULL,
	`stage` text DEFAULT 'Research' NOT NULL,
	`fit` integer DEFAULT 15 NOT NULL,
	`access` integer DEFAULT 15 NOT NULL,
	`trust` integer DEFAULT 15 NOT NULL,
	`readiness` integer DEFAULT 15 NOT NULL,
	`score` integer DEFAULT 60 NOT NULL,
	`learners` integer DEFAULT 0 NOT NULL,
	`notes` text DEFAULT '' NOT NULL,
	`updated_at` text NOT NULL
);
