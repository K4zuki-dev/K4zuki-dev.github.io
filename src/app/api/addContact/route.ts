import { NextResponse } from "next/server";
import app from "@/app/lib/firebase/fireClient";
import { getFirestore, collection, addDoc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const db = getFirestore(app);
    const collectionRef = collection(db, "Contacts");
    const reqBody: dbContact = await req.json();

    await addDoc(collectionRef, reqBody);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    throw new Error(
      "Failed to establish connection to the database. Status code: 424"
    );
  }
}
