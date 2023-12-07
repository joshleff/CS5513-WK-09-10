import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [uid, setUid] = useState("");
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setIsLoggedIn(user && user.uid ? true : false);
            setUser(user);
            setUid(user.uid);
        });
    });
    return { user, isLoggedIn, uid };
};
export default useAuth;