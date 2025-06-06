export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@._\-+!*#$=%?])[a-zA-Z\d@._\-+!*#$=%?]{8,60}$/;
export const usernameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/;

// Reserved usernames to avoid conflicts
export const reservedUsernames = [
  "admin",
  "administrator",
  "root",
  "api",
  "www",
  "mail",
  "ftp",
  "localhost",
  "test",
  "guest",
  "user",
  "support",
  "help",
  "info",
  "contact",
  "about",
  "blog",
  "news",
  "shop",
  "store",
  "app",
  "mobile",
  "web",
  "site",
  "null",
  "undefined",
  "true",
  "false",
  "system",
  "config",
  "settings",
];
