import { useLocation, useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function CheckoutPage() {

    const navigate = useNavigate();
    const location = useLocation();

    const register = location.state?.register || 1;
    const items = location.state?.items || [];
    const total = location.state?.total || 0;

    async function sendSale() {

        try {

            const saleData = {

                register,

                items,

                total,

                status: "waiting",

                createdAt: serverTimestamp()

            };

            const docRef = await addDoc(
                collection(db, "sales"),
                saleData
            );

            navigate("/sending", {

                state: {

                    saleId: docRef.id,

                    register,

                    total

                }

            });

        } catch (err) {

            console.error(err);
            alert("送信に失敗しました");

        }

    }

    return (

        <div className="checkout-page">

            <h1>会計確認</h1>

            <div className="checkout-items">

                {items.map((item, index) => (

                    <div
                        key={item.localId || index}
                        className="checkout-item"
                    >

                        <span>

                            {index + 1}. {item.name}

                        </span>

                        <span>

                            ¥{Number(item.price).toLocaleString()}

                        </span>

                    </div>

                ))}

            </div>

            <div className="checkout-total">

                合計：¥{Number(total).toLocaleString()}

            </div>

            <div className="checkout-buttons">

                <button
                    onClick={() => navigate(-1)}
                >

                    戻る

                </button>

                <button
                    onClick={sendSale}
                >

                    母機へ送信

                </button>

            </div>

        </div>

    );

}