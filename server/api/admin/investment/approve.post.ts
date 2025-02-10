import { sendInvestmentMail } from "~/lib/mail";
import prisma from "~/lib/prisma";
import { plans } from "~/lib/plan";
import { date } from "quasar";

export default defineEventHandler(async (event) => {
  const id = getQuery(event).tid as string;
  console.log(id);
  
  try {
    const ive = await prisma.investment.findUnique({
      where: {
        investmentId: parseInt(id),
      },
      select: {
        investmentId: true,
        start_date: true,
        active: true,
        plan: true,
      },
    });

    if (ive && ive.start_date) {
      return createError({
        statusCode: 400,
        statusMessage: "transaction have been previously approved",
      });
    }

    console.log("ive ",ive);

    const plan = plans.find((pl) => pl.value.toLowerCase().trim() == ive?.plan.toLowerCase().trim());

    if (!plan) {
      return createError({
        statusCode: 400,
        statusMessage: "Investment plan does not exist",
      });
    }

    const iv = await prisma.investment.update({
      where: {
        investmentId: parseInt(id),
      },
      data: {
        active: true,
        start_date: new Date(),
        next_due_date: date.addToDate(new Date(), {hours: plan.duration})
      },

      include: {
        user: true,
      },
    });

    await sendInvestmentMail(iv, iv.user.email);
    return { statusCode: 200, data: iv };
  } catch (error: any) {
    return createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }
});
