// Quando criamos uma classe de erro
// podemos diferenciar um erro do outro

export class AuthTokenError extends Error {
  constructor() {
    super("Error with authentication token.");
  }
}
