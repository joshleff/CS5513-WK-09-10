import {setDoc, doc} from "firebase/firestore";
import {db} from "@/lib/firebase";

const updateCount = async ( count ) => {
    try {
        await setDoc(doc(db, "count", "currentCount"), {
            currentCount: count
        });
    } catch (err) {}
};

export default updateCount;