import { useEffect, useMemo, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query
} from "firebase/firestore";
import { db } from "../firebase";

export default function AdminDashboard() {

  const [sales, setSales] = useState([]);

  useEffect(() => {

    const q = query(
      collection(db, "sales"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {

      setSales(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      );

    });

    return unsubscribe;

  }, []);

  const totalSales = useMemo(() =>

    sales.reduce(
      (sum, sale) => sum + Number(sale.total || 0),
      0
    )

  , [sales]);

  const totalCustomers = sales.length;

  const completedSales = sales.filter(
    sale => sale.status === "completed"
  ).length;

  return (

    <div className="admin-page">

      <h1>管理者ダッシュボード</h1>

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h2>総売上</h2>
          <p>¥{totalSales.toLocaleString()}</p>
        </div>

        <div className="dashboard-card">
          <h2>会計件数</h2>
          <p>{totalCustomers} 件</p>
        </div>

        <div className="dashboard-card">
          <h2>完了会計</h2>
          <p>{completedSales} 件</p>
        </div>

      </div>

      <h2>最新の売上</h2>

      {sales.map((sale) => (

        <div
          className="history-card"
          key={sale.id}
        >

          <div>レジ：{sale.register}</div>

          <div>状態：{sale.status}</div>

          <div>合計：¥{Number(sale.total).toLocaleString()}</div>

          <div>

            {sale.items?.map((item, index) => (

              <div key={index}>

                {item.name} × ¥{Number(item.price).toLocaleString()}

              </div>

            ))}

          </div>

        </div>

      ))}

    </div>

  );

}