import prisma from "~/lib/prisma"

export default defineEventHandler(async event => {
    try {
        const messages = await prisma.message.findMany({
         
            include:{
                user: {
                    select: {
                        id: true,
                        fullname: true,
                        email: true
                    }
                }
            }
        })
    
        return messages
    } catch (error) {
        console.log(error)
    }
})