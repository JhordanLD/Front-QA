export interface UserCredentials {
  user: string;
  pass: string;
  expectedError?: string;
}

export interface IUsers {
  [key: string]: UserCredentials;
}
