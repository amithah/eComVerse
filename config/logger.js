const { createLogger, transports, format } = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");

const logDir = "/";

// Define the log format
const logFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}]: ${message}`;
  })
);

// Define the logger

const logger = createLogger({
  level: "info", // Set your desired log level
  format: logFormat,
  transports: [
    new transports.Console({
      format: format.simple(),
    }),
    // new DailyRotateFile({
    //   filename: `${logDir}/%DATE%-error.log`, // Log files will be placed in the "logs" directory
    //   datePattern: "YYYY-MM-DD", // Daily log rotation
    //   level: "error", // Log error messages and above to this file
    //   zippedArchive: true, // Compress old log files
    // }),
    // new DailyRotateFile({
    //   filename: `${logDir}/%DATE%-combined.log`,
    //   datePattern: "YYYY-MM-DD",
    //   level: "info", // Log info messages and above to this file
    //   zippedArchive: true,
    // }),
  ],
});

module.exports = logger;
