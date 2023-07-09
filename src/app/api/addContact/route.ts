import { headers} from "next/headers"
import { NextResponse } from "next/server"
import clientPromise from "@/app/lib/mongodb/mongoClient"

let client
let db
let result

export async function POST(req: Request) {
    const data: mongoContact = await req.json()
    
    try {
        client = await clientPromise;
        db = client.db("Work");
        await db.collection("Contacts").insertOne(data)

        return NextResponse.json({status: "200"})

    }   catch (error) {
            throw new Error("Failed to establish connection to the database. Status code: 424");
        } 

}