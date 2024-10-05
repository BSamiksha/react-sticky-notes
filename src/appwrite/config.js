import { Client, Databases } from "appwrite";

const client = new Client()
    .setEndpoint(process.env.REACT_APP_ENDPOINT)
    .setProject(process.env.REACT_APP_PROJECT_ID);

const databases = new Databases(client);

const collections = [
    {
        name: "notes",
        id: process.env.REACT_APP_COLLECTION_NOTES_ID,
        dbId:  process.env.REACT_APP_DATABASE_ID
    },
];

export { client, databases, collections };
