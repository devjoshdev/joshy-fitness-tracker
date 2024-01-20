"use client";
import styles from "../styles/SignInSignOut.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
const SignInSignOut = () => {
    const { data: session, status } = useSession();
    const handleSignInSignOut = () => {
        if (status === "authenticated") {
            signOut({callbackUrl: "/"});
        }
        else {
            signIn("google", {callbackUrl: "/home"});
        }
    }
    return (
        <h3 className={styles["sign-sign"]} onClick={handleSignInSignOut}>{status === "authenticated" ? "Sign Out" : "Sign In"}</h3>
    )
};

export default SignInSignOut;