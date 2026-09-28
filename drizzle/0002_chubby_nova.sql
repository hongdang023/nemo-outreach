ALTER TABLE `targets` ADD `entity_type` text DEFAULT 'Organization' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `relationship_type` text DEFAULT 'Distribution' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `organization` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `contact_email` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `contact_phone` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `contact_form_url` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `preferred_contact_method` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `facebook_url` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `linkedin_url` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `warm_contact_person` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `warm_contact_team` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `warm_contact_note` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `relationship_strength` text DEFAULT 'Cold' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `introduction_status` text DEFAULT 'Not requested' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `source_urls` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `research_summary` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `advocate_type` text DEFAULT '' NOT NULL;