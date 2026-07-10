import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs
} from "firebase/firestore";
import { db } from "../firebase";

export default function ProductManager() {

  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    barcode: "",
    name: "",
    price: "",
    stock: "",
    attribute: "",
    image: ""
  });

  async function loadProducts() {

    const snapshot = await getDocs(collection(db, "products"));

    setProducts(
      snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    );

  }

  useEffect(() => {

    loadProducts();

  }, []);

  async function addProduct() {

    if (!form.barcode || !form.name) return;

    await addDoc(collection(db, "products"), {

      barcode: form.barcode,
      name: form.name,
      price: Number(form.price),
      stock: Number(form.stock),
      attribute: form.attribute,
      image: form.image

    });

    setForm({
      barcode: "",
      name: "",
      price: "",
      stock: "",
      attribute: "",
      image: ""
    });

    loadProducts();

  }

  async function removeProduct(id) {

    await deleteDoc(doc(db, "products", id));

    loadProducts();

  }

  return (

    <div className="product-page">

      <h1>商品マスター管理</h1>

      <div className="product-form">

        <input
          placeholder="JANコード"
          value={form.barcode}
          onChange={e=>setForm({...form,barcode:e.target.value})}
        />

        <input
          placeholder="商品名"
          value={form.name}
          onChange={e=>setForm({...form,name:e.target.value})}
        />

        <input
          placeholder="価格"
          value={form.price}
          onChange={e=>setForm({...form,price:e.target.value})}
        />

        <input
          placeholder="在庫"
          value={form.stock}
          onChange={e=>setForm({...form,stock:e.target.value})}
        />

        <input
          placeholder="属性"
          value={form.attribute}
          onChange={e=>setForm({...form,attribute:e.target.value})}
        />

        <input
          placeholder="画像URL"
          value={form.image}
          onChange={e=>setForm({...form,image:e.target.value})}
        />

        <button onClick={addProduct}>

          商品追加

        </button>

      </div>

      <hr />

      {products.map(product=>(

        <div
          className="product-card"
          key={product.id}
        >

          <div>{product.name}</div>

          <div>{product.barcode}</div>

          <div>¥{Number(product.price).toLocaleString()}</div>

          <button
            onClick={()=>removeProduct(product.id)}
          >

            削除

          </button>

        </div>

      ))}

    </div>

  );

}