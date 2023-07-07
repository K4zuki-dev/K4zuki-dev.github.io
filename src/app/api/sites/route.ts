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

  console.log(sites)

  return NextResponse.json(sites) ;


  // remove this if u want the old response back, this is hardcoded
  // return NextResponse.json([{title: "Portfolio", description:"lalalal", image: "test"}, {title: "Test", description:"lalalaldsfh", image: "tesniggert"}])
}
