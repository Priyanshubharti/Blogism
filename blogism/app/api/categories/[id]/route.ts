import { connectToDb, generateErrorMessage, generateSuccessMessage } from "@/lib/helpers"
import prisma from "@/prisma";

export const GET = async (req : Request, {params} : {params:{id : string}}) =>{
    const id = params.id;
    try {
        await connectToDb();
        const category = await prisma.category.findFirst(
            {
                where : {id},
                include : {_count : true, blogs : true}
            }
        )
        return generateSuccessMessage({category}, 200);
    } catch (error) {
        return generateErrorMessage({error}, 500);
    }finally{
        await prisma.$disconnect();
    }

}