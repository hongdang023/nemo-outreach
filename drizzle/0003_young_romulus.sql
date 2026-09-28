ALTER TABLE `targets` ADD `location` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `audience` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `audience_size_estimate` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `audience_fit` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `expertise_area` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `platforms` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `content_topics` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `promotion_channel` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `organization_type` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `organization_size` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `decision_maker_role` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `distribution_channels` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `access_to_learners` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `engagement_quality` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `influence_type` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `partnership_readiness` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `targets` ADD `research_confidence` text DEFAULT 'Low' NOT NULL;