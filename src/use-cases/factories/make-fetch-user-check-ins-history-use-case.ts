import { FetchUserCheckHistoryUseCase } from "../fetch-user-ins-history";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new FetchUserCheckHistoryUseCase(checkInsRepository);

  return useCase;
}
