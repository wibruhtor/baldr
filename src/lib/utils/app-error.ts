export class AppError extends Error {
	private status: number;

	private server_message: string | null;

	private traceId: string;

	private other: Record<string, unknown>;

	constructor(
		status: number,
		server_message: string | null,
		traceId: string = '',
		other: Record<string, unknown> = {},
	) {
		if (server_message) {
			super(`AppError(${status}): ${server_message}`);
		} else {
			super(`AppError(${status}): unexpected error`);
		}
		this.status = status;
		this.server_message = server_message;
		this.traceId = traceId;
		this.other = other;
	}

	getStatus() {
		return this.status;
	}

	getMessage() {
		return this.server_message || undefined;
	}

	getTraceId() {
		return this.traceId;
	}

	getOther() {
		return this.other;
	}
}
