import { NextResponse } from "next/server";
import app from "@/app/lib/firebase/fireClient";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    var data: any[] = [];
    const db = getFirestore(app);
    const collectionRef = collection(db, "Sites");

    await getDocs(collectionRef).then((snapshot) => {
      snapshot.docs.map((doc) => {
        data.push({ ...doc.data() });
      });
    });

    const StringifiedData = JSON.stringify(data);
    const Sites: Sites = JSON.parse(StringifiedData);

    return NextResponse.json(Sites);

  } catch (error) {
    throw new Error("Failed to establish connection to the database");
  }
}
