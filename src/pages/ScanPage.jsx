import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BarcodeScanner from "../components/BarcodeScanner";
import { getProductByBarcode } from "../data/productService";

export default function ScanPage() {

    const navigate = useNavigate();
    const location = useLocation();

    const register = location.state?.register || 1;

    const [items, setItems] = useState([]);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("success");

    const audioRef = useRef(null);

    useEffect(() => {

        audioRef.current = new Audio("/sounds/scan.mp3");

    }, []);

    async function onBarcodeDetected(barcode) {

        const product = await getProductByBarcode(barcode);

        if (!product) {

            setMessageType("error");
            setMessage("商品が見つかりません");

            setTimeout(() => {

                setMessage("");

            }, 2000);

            return;

        }

        setItems(prev => [

            ...prev,

            {

                localId: Date.now() + Math.random(),

                ...product

            }

        ]);

        setMessageType("success");
        setMessage(`${product.name} を追加しました`);

        setTimeout(() => {

            setMessage("");

        }, 1500);

        try {

            audioRef.current.currentTime = 0;
            audioRef.current.play();

        } catch {}

        if (navigator.vibrate) {

            navigator.vibrate(35);

        }

    }

    const removeItem = (id) => {

        setItems(prev => prev.filter(item => item.localId !== id));

    };

    const total = items.reduce((sum, item) => sum + item.price, 0);

    const itemCount = items.length;

    return (

        <div className="scan-page">

            <div className="camera-area">

                <BarcodeScanner
                    onDetected={onBarcodeDetected}
                />

            </div>

                        <div className="parchment">

                <div className="parchment-title">

                    読み取り商品

                </div>

                {message && (

                    <div className={`scan-message ${messageType}`}>

                        {message}

                    </div>

                )}

                <div className="item-list">

                    {items.length === 0 && (

                        <div className="empty-message">

                            商品を読み取ってください

                        </div>

                    )}

                    {items.map((item, index) => (

                        <div
                            className="item-row"
                            key={item.localId}
                        >

                            <div className="item-info">

                                <div className="item-name">

                                    {index + 1}. {item.name}

                                </div>

                                <div className="item-barcode">

                                    JAN : {item.barcode}

                                </div>

                            </div>

                            <div className="item-price">

                                ¥{Number(item.price).toLocaleString()}

                            </div>

                            <button
                                className="delete-button"
                                onClick={() => removeItem(item.localId)}
                            >

                                ×

                            </button>

                        </div>

                    ))}

                </div>

            </div>

            <div className="scan-footer">

                <div className="scan-summary">

                    <div>

                        商品数：<strong>{itemCount}</strong>

                    </div>

                    <div>

                        合計：<strong>¥{total.toLocaleString()}</strong>

                    </div>

                </div>

                <button
                    className="checkout-button"
                    disabled={itemCount === 0}
                    onClick={() =>
                        navigate("/checkout", {
                            state: {
                                register,
                                items,
                                total
                            }
                        })
                    }
                >

                    会計確認へ

                </button>

            </div>

        </div>
            );

}