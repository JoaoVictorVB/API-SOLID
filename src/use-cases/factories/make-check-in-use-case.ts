import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { CheckInUseCase } from "../check-in";

export function makeGetCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const GymsRepository = new PrismaGymsRepository();
  const useCase = new CheckInUseCase(checkInsRepository, GymsRepository);

  return useCase;
}
