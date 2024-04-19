import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymUseCase = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 100;
    }),
  });

  const { title, description, phone, latitude, longitude } =
    createGymUseCase.parse(request.body);

  const createGym = makeCreateGymUseCase();

  await createGym.execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  });

  return reply.status(201).send();
}