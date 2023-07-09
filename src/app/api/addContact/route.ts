import { NextResponse } from "next/server"
import clientPromise from "@/app/lib/mongodb/mongoClient"
import { mongoContact } from "../../../../types"

let client
let db

export async function POST(req: Request) {
    const data: mongoContact = await req.json()

    console.log(data)
    
    try {
        client = await clientPromise;
        db = client.db("Work");
        await db.collection("Contacts").insertOne(data)

        return NextResponse.json({status: "200"})

    }   catch (error) {
            throw new Error("Failed to establish connection to the database. Status code: 424");
        } 

}