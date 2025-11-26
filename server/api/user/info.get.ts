import jwt, { JwtPayload } from "jsonwebtoken";
import { sumAndEvaluateInvestment } from "~/lib/cached/XY";
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    const token = getHeader(event, "Authorization")?.split(" ")[1] as string;
    
    const U = jwt.verify(token, config.jwt_secret) as JwtPayload as any;

    // xxxxxxx fetch and update all transaction xxxxxx
      try {
        await sumAndEvaluateInvestment(event)
      } catch (error) {
        console.log("Error in sumAndEvaluateInvestment:", error);
      }
    // 

    const user = await prisma.user.findUnique({
      where: {
        id: U.id,
      },
      include: {
        account: true,
        transactions: true,
        investments: true,
        referredBy: true
      }
    });

    if (user?.password) {
      (user as any).password = undefined;
    }

    return { statusCode: 200, user };
  } catch (error) {
    console.log(error);
    return { statusCode: 400 };
  }
});
