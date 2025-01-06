export class InternalServerError extends Error {
  constructor({ cause }) {
    super("Um erro interno não esperado ocorreu", {
      cause,
    });
    this.name = "InternalServerError";
    this.action = "Entre em contato com o suporte";
    this.status_code = 500;
  }
  toJSON() {
    return {
      name: this.name,
      error: this.message,
      action: this.action,
      status_code: this.status_code,
    };
  }
}
