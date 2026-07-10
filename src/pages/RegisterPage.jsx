import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  orderBy,
  query
} from "firebase/firestore";
import { db } from "../firebase";

export default function RegisterPage() {

  const [sales, setSales] = useState([]);

  useEffect(() => {

    const q = query(
      collection(db, "sales"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {

      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setSales(list);

    });

    return () => unsubscribe();

  }, []);

  async function completeSale(id) {

    try {

      await updateDoc(doc(db, "sales", id), {

        status: "completed"

      });

    } catch (err) {

      console.error(err);

      alert("更新に失敗しました");

    }

  }

  return (

    <div className="register-page">

      <h1>母機レジ</h1>

      {sales.map((sale) => (

        <div
          key={sale.id}
          className="sale-card"
        >

          <div>

            レジ：{sale.register}

          </div>

          <div>

            合計：¥{Number(sale.total).toLocaleString()}

          </div>

          <div>

            状態：{sale.status}

          </div>

          <div className="sale-items">

            {sale.items?.map((item, index) => (

              <div key={index}>

                {item.name}　¥{Number(item.price).toLocaleString()}

              </div>

            ))}

          </div>

          {sale.status === "waiting" && (

            <button
              onClick={() => completeSale(sale.id)}
            >

              会計完了

            </button>

          )}

        </div>

      ))}

    </div>

  );

}