import clientPromise from "@/app/lib/mongodb/mongoClient";
import { NextResponse } from "next/server";

let client;
let db;
let sites;

export async function GET() {
  try {

    client = await clientPromise;
    db = client.db("Work");
    sites = await db.collection("Work").find({}).toArray();

  } catch (error) {
    
    throw new Error("Failed to establish connection to the database");

  } 

  return NextResponse.json(sites) ;
}
