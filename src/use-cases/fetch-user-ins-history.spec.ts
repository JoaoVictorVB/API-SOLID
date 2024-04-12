import { expect, it, describe, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { FetchUserCheckHistoryUseCase } from "./fetch-user-ins-history";

let CheckInsRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckHistoryUseCase;

describe("Fetch Check-in History Use Case", () => {
  beforeEach(async () => {
    CheckInsRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckHistoryUseCase(CheckInsRepository);
  });

  it("should be able to fetch check-in history", async () => {
    await CheckInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    await CheckInsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    });

    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-01" }),
      expect.objectContaining({ gym_id: "gym-02" }),
    ]);
  });

  it("should be able to fetch paginated check-in history", async () => {
    for (let i = 1; i <= 22; i++) {
      await CheckInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: "user-01",
      });
    }

    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-21" }),
      expect.objectContaining({ gym_id: "gym-22" }),
    ]);
  });
});
