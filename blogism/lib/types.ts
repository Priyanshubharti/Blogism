export type BlogItemTypes = 
    {
        id: string;
        title: string;
        description: string;
        imageUrl: string;
        userId: string;
        createdAt: string;
        updatedAt: string;
        categoryId: string;
        location: string;
        isProfile? : boolean
    }

    export type UserItemTypes = 
    {
        id: string;
        name : string,
        email : string,
        blogs : BlogItemTypes[],
        _count : {blogs : number},
        message : string
    }
