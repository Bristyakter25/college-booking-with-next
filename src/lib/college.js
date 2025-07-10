// lib/college.js
import dbConnect, { collectionNamesObj } from './mongoDBConnect';

export async function getAllColleges() {
  const collegeCollection = await dbConnect(collectionNamesObj.infoCollection);
  return await collegeCollection.find({}).toArray();
}
