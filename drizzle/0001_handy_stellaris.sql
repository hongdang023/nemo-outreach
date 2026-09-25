ALTER TABLE `targets` ADD `contact_status` text DEFAULT 'Research needed' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `trials` integer DEFAULT 0 NOT NULL;