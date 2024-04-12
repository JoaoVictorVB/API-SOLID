import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface FetchUserCheckHistoryUseCaseRequest {
  userId: string;
  page: number;
}

interface FetchUserCheckHistoryUseCaseResponse {
  checkIns: CheckIn[];
}

export class FetchUserCheckHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckHistoryUseCaseRequest): Promise<FetchUserCheckHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page
    );

    return {
      checkIns,
    };
  }
}
