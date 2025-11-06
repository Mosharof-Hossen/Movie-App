// track the searches made by a user
import { Client, Databases, ID, Query, } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID;
const ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;

const client = new Client()
    .setEndpoint(ENDPOINT!)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)


const databases = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
    console.log("movie", movie);
    try {
        const result = await databases.listDocuments(
            DATABASE_ID!,
            COLLECTION_ID!, [
            Query.equal("searchTerm", query)
        ]
        )
        console.log(result);

        if (result.documents.length > 0) {
            const document = result.documents[0];
            const count = document.count + 1;
            await databases.updateDocument(
                DATABASE_ID!,
                COLLECTION_ID!,
                document.$id,
                { count }
            )
        } else {
            await databases.createDocument(
                DATABASE_ID!,
                COLLECTION_ID!,
                ID.unique(),
                {
                    searchTerm: query,
                    movie_id: movie.id,
                    title: movie.title,
                    count: 1,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                }
            );
            console.log("created");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};