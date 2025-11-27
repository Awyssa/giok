interface LoggerFn {
	(message: string, data?: unknown): void;
}

interface Logger {
	info: LoggerFn;
	success: LoggerFn;
	error: LoggerFn;
	warn: LoggerFn;
	dir: LoggerFn;
}

const log: Logger = {
	info: (msg, data) => console.log(`📎 INFO - ${msg}`, data ? ` === ${data}` : ""),
	success: (msg, data) => console.log(`✅ SUCCESS - ${msg}`, data ? ` === ${data}` : ""),
	error: (msg, data) => console.error(`❌ ERROR - ${msg}`, data ? ` === ${data}` : ""),
	warn: (msg, data) => console.warn(`⚠️ WARNING - ${msg}`, data ? ` === ${data}` : ""),
	dir: (msg, data) => {
		console.log(msg);
		console.dir(data);
	},
};

export { log };
