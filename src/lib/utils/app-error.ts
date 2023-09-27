export class AppError extends Error {
  private status: number;

  private server_message: string | null;

  private requestId: string;

  private other: Record<string, unknown>;

  constructor(status: number, server_message: string | null, requestId: string = '', other: Record<string, unknown> = {}) {
    if (server_message) {
      super(`AppError(${status}): ${server_message}`);
    } else {
      super(`AppError(${status}): unexpected error`);
    }
    this.status = status;
    this.server_message = server_message;
    this.requestId = requestId;
    this.other = other;
  }

  getStatus() {
    return this.status;
  }

  getMessage() {
    return this.message;
  }

  getRequestId() {
    return this.requestId;
  }

  getOther() {
    return this.other;
  }
}
