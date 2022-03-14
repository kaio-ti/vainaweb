import request from "supertest";
import app from "../app";
import { createConnection, getConnection } from "typeorm";

const testUser = {
  name: "teste",
  phone: "999999999",
  CPF: "10000000000",
  CEP: "71705035",
  Street: "avenida contorno",
  City: "Brasília",
  State: "DF",
};

const failTestUser = {
  phone: "999999999",
  CPF: "10000000000",
  CEP: "71705035",
  Street: "avenida contorno",
  City: "Brasília",
  State: "DF",
};

const failMoreKeysUser = {
  name: "user",
  phone: "99999999",
  CPF: "10000000000",
  CEP: "71705035",
  Street: "avenida contorno",
  City: "Brasília",
  State: "DF",
  more: "value",
};

interface IUser {
  name: string;
  phone: string;
  CPF: string;
  CEP: string;
  Street: string;
  City: string;
  State: string;
}

describe("Testing user CRUD", () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const defaultConnection = getConnection();
    await defaultConnection.close();
  });

  let user_uuid = "";
  let user_cpf = "";
  let user_cep = "";
  let token = "";
  let failCPF = "0000000";
  let notregisteredCPF = "00000000000";
  let notregisteredUuid = "720a9708-5d73-40b8-8391-857a48137ec1";

  it("Should return a new user", async () => {
    const res = await request(app).post("/users/register").send(testUser);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("uuid");

    user_uuid = res.body.uuid;
    user_cpf = res.body.CPF;
    user_cep = res.body.CEP;
  });

  it("Should fail to return a new user - missing fields", async () => {
    const res = await request(app).post("/users/register").send(failTestUser);

    expect(res.status).toBe(400);
    expect(res.body).toStrictEqual({
      message: "Missing fields",
    });
  });

  it("Should fail to return a new user - more fields", async () => {
    const res = await request(app)
      .post("/users/register")
      .send(failMoreKeysUser);

    expect(res.status).toBe(400);
    expect(res.body).toStrictEqual({
      message: "The key: 'more' is not allowed",
    });
  });

  it("Should login", async () => {
    const res = await request(app).post("/login").send({
      CPF: testUser.CPF,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  it("Should fail to login - wrong CPF length", async () => {
    const res = await request(app).post("/login").send({
      CPF: failCPF,
    });

    expect(res.status).toBe(400);
    expect(res.body).toStrictEqual({
      message: "CPF must have 11 charcters",
    });
  });

  it("Should fail to login - not registered", async () => {
    const res = await request(app).post("/login").send({
      CPF: notregisteredCPF,
    });

    expect(res.status).toBe(401);
    expect(res.body).toStrictEqual({
      message: "User not registered",
    });
  });

  it("Should list all users", async () => {
    const res = await request(app)
      .get("/users")
      .set({ Authorization: `Bearer ${token}` });

    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty("name");
  });

  it("Should fail to list all users", async () => {
    const res = await request(app).get("/users");

    expect(res.status).toBe(401);
    expect(res.body).toStrictEqual({
      message: "Missing authorization header",
    });
  });

  it("Should return a user by CPF", async () => {
    const res = await request(app)
      .get(`/users/cpf/${user_cpf}`)
      .set({ Authorization: `Bearer ${token}` });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name");
  });

  it("Should not find a user with wrong CPF", async () => {
    const res = await request(app)
      .get(`/users/cpf/${failCPF}`)
      .set({ Authorization: `Bearer ${token}` });

    expect(res.status).toBe(400);
    expect(res.body).toStrictEqual({
      message: "CPF must have 11 characters",
    });
  });

  it("Should not find a user with unregistered CPF", async () => {
    const res = await request(app)
      .get(`/users/cpf/${notregisteredCPF}`)
      .set({ Authorization: `Bearer ${token}` });

    expect(res.status).toBe(404);
    expect(res.body).toStrictEqual({
      message: "User not found",
    });
  });

  it("Should list users by CEP", async () => {
    const res = await request(app)
      .get(`/users/cep/${user_cep}`)
      .set({ Authorization: `Bearer ${token}` });

    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty("name");
  });

  it("Should delete a user", async () => {
    const res = await request(app)
      .delete(`/users/${user_uuid}`)
      .set({ Authorization: `Bearer ${token}` });

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({
      message: "User deleted with success",
    });
  });

  it("Should fail to delete a user", async () => {
    const res = await request(app)
      .delete(`/users/${notregisteredUuid}`)
      .set({ Authorization: `Bearer ${token}` });

    expect(res.status).toBe(404);
    expect(res.body).toStrictEqual({
      message: "User not found",
    });
  });
});
