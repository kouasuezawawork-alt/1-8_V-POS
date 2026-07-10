import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    doc,
    onSnapshot
} from "firebase/firestore";
import { db } from "../firebase";

export default function SendingPage() {

    const navigate = useNavigate();
    const location = useLocation();

    const saleId = location.state?.saleId;
    const register = location.state?.register;

    useEffect(() => {

        if (!saleId) {

            navigate("/");

            return;

        }

        const unsubscribe = onSnapshot(

            doc(db, "sales", saleId),

            (snapshot) => {

                if (!snapshot.exists()) return;

                const data = snapshot.data();

                if (data.status === "completed") {

                    navigate("/scan", {

                        replace: true,

                        state: {

                            register

                        }

                    });

                }

            }

        );

        return () => unsubscribe();

    }, [saleId]);

    return (

        <div className="sending-page">

            <div className="magic-circle"></div>

            <h2>

                母機へ送信中...

            </h2>

            <p>

                少々お待ちください

            </p>

        </div>

    );

}