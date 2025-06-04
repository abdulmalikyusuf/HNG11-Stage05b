CREATE TABLE `devLinks_platforms` (
	`id` varchar(128) NOT NULL,
	`link` varchar(256),
	`type` text,
	`user_id` varchar(128),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `devLinks_platforms_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `devLinks_users` (
	`id` varchar(128) NOT NULL,
	`first_name` varchar(256),
	`last_name` varchar(256),
	`email` varchar(256) NOT NULL,
	`avatar` varchar(1024),
	`password` varchar(1024) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `devLinks_users_id` PRIMARY KEY(`id`),
	CONSTRAINT `devLinks_users_email_unique` UNIQUE(`email`),
	CONSTRAINT `email_idx` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `devLinks_platforms` ADD CONSTRAINT `devLinks_platforms_user_id_devLinks_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `devLinks_users`(`id`) ON DELETE cascade ON UPDATE no action;