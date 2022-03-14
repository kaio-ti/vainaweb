declare namespace Express {
  interface Request {
    user: {
      userData: {
        uuid: string;
        name: string;
        CPF: string;
        CEP: string;
        Street: string;
        City: string;
        State: string;
        password: string;
      };
    };
  }
}
