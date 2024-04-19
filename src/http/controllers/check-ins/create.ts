import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeGetCheckInUseCase } from "@/use-cases/factories/make-check-in-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  });

  const createCheckInBodySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 100;
    }),
  });

  const { gymId } = createCheckInParamsSchema.parse(request.params);

  const { latitude, longitude } = createCheckInBodySchema.parse(request.body);

  const createCheckInUseCase = makeGetCheckInUseCase();

  await createCheckInUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(201).send();
}
