CREATE TABLE `items` (
	`id` text PRIMARY KEY NOT NULL,
	`itemName` text NOT NULL,
	`itemPrice` real NOT NULL,
	`storeId` text,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`storeId`) REFERENCES `stores`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`itemId` text,
	`quantity` integer NOT NULL,
	`userId` text,
	`penseId` text,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`itemId`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`penseId`) REFERENCES `penses`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `penses` (
	`id` text PRIMARY KEY NOT NULL,
	`createdBy` text,
	`storeId` text,
	`totalAmount` real NOT NULL,
	`paidBy` text,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`storeId`) REFERENCES `stores`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`paidBy`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `settlements` (
	`id` text PRIMARY KEY NOT NULL,
	`penseId` text,
	`palId` text,
	`amountOwed` real NOT NULL,
	`paymentStatus` text NOT NULL,
	FOREIGN KEY (`penseId`) REFERENCES `penses`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`palId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `stores` (
	`id` text PRIMARY KEY NOT NULL,
	`storeName` text NOT NULL,
	`createdBy` text,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`userName` text NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP
);
