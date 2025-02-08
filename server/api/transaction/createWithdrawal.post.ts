import z from "zod";
import prisma from "~/lib/prisma";

const schema = z.object({
  amount: z.coerce
    .number({ message: "Please enter a valid amount" })
    .min(1, { message: "amount must be greather than $1" }),
  channel: z
    .string()
    .min(1, { message: "please select a valid withdrawal channel" }),
  wallet: z.string().min(1),
});

async function generateId(): Promise<number> {
  try {
    const id = Math.floor(100000 + Math.random() * 99999999);
    const inv = await prisma.transaction.findUnique({
      where: {
        transactionId: id,
      },
    });

    if (inv) {
      return generateId();
    } else {
      return id;
    }
  } catch (error: any) {
    throw createError({ statusMessage: error.message, message: error.messae });
  }
}

export default defineEventHandler(async (event) => {
  try {
    const { error, data } = await readValidatedBody(event, schema.safeParse);
    if (error) {
      return createError({
        statusCode: 422,
        statusMessage: error.issues[0].message,
      });
    }
    const user = await prisma.user.findFirst({
      where: {
        id: event.context.user.id,
      },
      include: {
        account: true,
      },
    });

    if (Number(user?.account?.balance) < data.amount) {
      return { statusCode: 400, statusMessage: "insufficent funds" };
    }
    const tid = await generateId();
    await prisma.transaction.create({
      data: {
        amount: data.amount,
        userId: event.context.user.id,
        channel: data.channel,
        wallet: data.wallet,
        transactionId: tid,
        type: "withdrawal",
      },
    });

    return {statusCode: 201}
  } catch (error: any) {
    return createError({statusMessage: error.message})
  }
});
