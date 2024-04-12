import { expect, it, describe } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { PassThrough } from "stream";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;
describe("Register Use Case", () => {
  it("should be able to register", async () => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);

    const { user } = await sut.execute({
      name: "john paranormal",
      email: "paranormal@sempre.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
  it("shouldd hash user password upon registration", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUserCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUserCase.execute({
      name: "john paranormal",
      email: "paranormal@sempre.com",
      password: "123456",
    });
  });
  it("should not be able to register with same email twice", async () => {
    const email = " johndoe@example.com";

    await sut.execute({
      name: "john doe",
      email,
      password: "123456",
    });

    expect(() =>
      sut.execute({
        name: "John doe",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
