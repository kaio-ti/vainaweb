import UsersRepository from "../repositories/user.repository";
import { getCustomRepository } from "typeorm";

export const deleteUser = async (req: any, res: any) => {
  const { CPF } = req.params;

  const usersRepository = getCustomRepository(UsersRepository);

  const deletedUser = await usersRepository.delete(CPF);

  return res.status(200).json({ message: "User deleted" });
};
