import prisma from "~/lib/prisma";
import { z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const schema = z.object({
  fullname: z
    .string()
    .min(2, { message: "firstname and lastname cannot be empty" }),
  email: z.string().email({ message: "email address is invalid" }),
  country: z.string().min(2, { message: "Please select a valid country" }),
  phone: z.string().min(10, { message: "enter a valid phone number" }),
  referred_id: z.coerce.number().int().nullable(),
  password: z
    .string()
    .min(6, { message: "strong password must be six (6) characters or more" }),
});

export default defineEventHandler(async (event) => {
  try {
    const { error, data: body } = await readValidatedBody(
      event,
      schema.safeParse
    );
    if (error) {
      return createError({
        statusCode: 400,
        statusMessage: error.issues[0].message,
      });
    }
    const config = useRuntimeConfig();
    const salt = bcrypt.genSaltSync(10);
    const psw = bcrypt.hashSync(body.password, salt);
    const user = await prisma.user.create({
      data: {
        ...body,
        password: psw,
        referred_id: body.referred_id ?? null,
        account: {
            create: {
                balance: 5.0
            }
        },
      },
      omit: {
        password: true,
        referred_id: true
      },
    });

    const token = jwt.sign(user, config.jwt_secret, {expiresIn: '24h'});
    // send verification code
    setCookie(event, 'Authorization', token, {secure: true, sameSite: 'lax'})
    return { statusCode: 201};
  } catch (error: any) {
    return createError({
      statusCode: 400,
      statusMessage: error.message,
    });
  }
});
