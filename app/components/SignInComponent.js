"use client";
import {signIn} from "next-auth/react";
const SignInComponent = ({callback}) => {
    signIn("google", {callbackUrl: `/${callback}`});
};

export default SignInComponent;