import { CreateGymUseCase } from "../create-gym";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeCreateGymUseCase() {
  const GymsRepository = new PrismaGymsRepository();
  const useCase = new CreateGymUseCase(GymsRepository);

  return useCase;
}
