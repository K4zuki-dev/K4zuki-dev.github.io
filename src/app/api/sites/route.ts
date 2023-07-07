import clientPromise from '@/app/lib/mongodb/mongoClient'
import { MongoClient, WithId } from 'mongodb'
import { NextResponse } from 'next/server';
import next from 'next/types';
import { Result } from 'postcss';



export async function GET(){
    try {

        const client = await clientPromise;
        const db =  client.db("Work");
        var sites =  await db.collection("Work").find({}).next();
        
    } catch (error) {
        throw new Error("Failed to establish connection to the database")
    }


    return NextResponse.json(sites)
    
}