import prisma from "~/lib/prisma"

export default defineEventHandler(async event => {
    const id = getQuery(event).tid as string
    try {
        await prisma.transaction.update({
            where: {
                transactionId: parseInt(id)
            },
            data: {
                status: 'approved'
            }
        })

        return {statusCode: 200}
    } catch (error: any) {
        return createError({
            statusCode: 500, statusMessage: error.message
        })
    }
})