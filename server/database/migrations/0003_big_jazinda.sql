PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_hits` (
	`id` integer PRIMARY KEY NOT NULL,
	`count` integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_hits`("id", "count") SELECT "id", "count" FROM `hits`;--> statement-breakpoint
DROP TABLE `hits`;--> statement-breakpoint
ALTER TABLE `__new_hits` RENAME TO `hits`;--> statement-breakpoint
PRAGMA foreign_keys=ON;