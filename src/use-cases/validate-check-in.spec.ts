import { expect, it, describe, beforeEach, afterEach, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { ValidateCheckInUseCase } from "./validate-check-in";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { LateCheckInValidationError } from "./errors/late-check-in-validation-error";

let CheckInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe("Validate CheckIn Use Case", () => {
  beforeEach(async () => {
    CheckInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(CheckInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to validate the check-in", async () => {
    const createdCheckIn = await CheckInsRepository.create({
      gym_id: "gym-01",
      user_id: "gym-01",
    });
    await sut.execute({
      checkInId: createdCheckIn.id,
    });

    expect(createdCheckIn.validated_at).toEqual(expect.any(Date));
    expect(CheckInsRepository.items[0].validated_at).toEqual(expect.any(Date));
  });

  it("should not be able to validate an inexistent check-in", async () => {
    await expect(() =>
      sut.execute({
        checkInId: "inexistent-check-in-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
  it("should be able to validate the check-in", async () => {
    const createdCheckIn = await CheckInsRepository.create({
      gym_id: "gym-01",
      user_id: "gym-01",
    });

    const twentyOneMinutesInMs = 1000 * 60 * 21;

    vi.advanceTimersByTime(twentyOneMinutesInMs);

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      })
    ).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});
