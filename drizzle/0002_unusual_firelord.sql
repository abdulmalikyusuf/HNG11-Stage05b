DROP TABLE `devLinks_platforms`;--> statement-breakpoint
ALTER TABLE `devLinks_users` ADD `social_links` json DEFAULT ('[{"platform":"github","url":"https://www.github.com/johnappleseed"}]');