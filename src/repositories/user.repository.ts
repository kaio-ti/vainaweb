import { EntityRepository, Repository } from "typeorm";
import User from "../entities/user.entity";

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async get(): Promise<User[] | undefined> {
    const users = await this.find({
      order: {
        CPF: "ASC",
      },
    });

    return users;
  }

  public async findById(uuid: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        uuid,
      },
    });

    return user;
  }

  public async findByCPF(CPF: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        CPF,
      },
    });

    return user;
  }

  public async findByCEP(CEP: string): Promise<User[] | undefined> {
    const users = await this.find({
      where: {
        CEP: CEP,
      },
    });
    return users;
  }
}

export default UsersRepository;
