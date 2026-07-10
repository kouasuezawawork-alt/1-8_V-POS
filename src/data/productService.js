import {
  collection,
  getDocs,
  query,
  where,
  limit
} from "firebase/firestore";

import { db } from "../firebase";

export async function getProductByBarcode(barcode) {
  const q = query(
    collection(db, "products"),
    where("barcode", "==", String(barcode)),
    limit(1)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  return {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data(),
  };
}