import { db } from "@/lib/firebase";
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
    setDoc
} from "firebase/firestore";

const addTodo = async ({ userId, title, description, status }) => {
    try {
        await addDoc(collection(db, userId), {
            type: "todo",
            title: title,
            description: description,
            status: status,
            createdAt: new Date().getTime(),
        });
    } catch (err) {}
};
const toggleTodoStatus = async ({ user, docId, status }) => {

    try {
        const todoRef = await doc(db, user.uid, docId);
        await updateDoc(todoRef, {
            status,
        });
    } catch (err) {
        console.log(err);
    }
};
const deleteTodo = async (user, docId) => {

    try {
        const todoRef = doc(db, user, docId);
        await deleteDoc(todoRef);
    } catch (err) {
        console.log(err);
    }
};
export { addTodo, toggleTodoStatus, deleteTodo };