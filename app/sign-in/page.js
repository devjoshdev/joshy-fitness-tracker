import { getServerSession } from "next-auth";
import SignInComponent  from "../components/SignInComponent";
import styles from "../styles/SignIn.module.css";
export default async function SignIn({params, searchParams}) {
    const callbackUrl = searchParams["callback"] !== "" ? searchParams["callback"] : "home";
    console.log("callback url is '", callbackUrl, "'");
    const session = await getServerSession();
    /*
    TODO for this page:
        1. Check for if the user is signed in
        2. If so, display message saying you're already signed in and to use navbar to choose a page to go to
        3. If not, display component (to be made) that takes in a callback and arguments for that callback if necessary and signs the user in and redirects to initial page
        4. Chalk the formatting for the text if signed in
    */ 
   if (session) {
    return (
        <div className={styles["sign-in-container"]}>
            <div className={styles["sign-in-flexa"]}>
                <h2 style={{marginBottom: "0px", whiteSpace: "nowrap",}}>You're already signed in amigo, use the nav bar</h2>
                <h2 className={styles["inline-header2-underline"]}>above</h2>
                <h2 style={{marginBottom: "0", whiteSpace: "nowrap",}}>to dive head first into the action!</h2>
            </div>
            <p style={{fontSize: "20px", marginTop: "0%",}}>or</p>
            <div className={styles["sign-in-flexa"]}>
                <h2 style={{marginBottom: "0px", marginTop: "0"}}>Click the Sign Out button in the</h2>
                <h2 style={{marginLeft: "6px", marginRight: "8px", marginBottom: "0", marginTop: "0", whiteSpace: "nowrap",}}>top right</h2>
                <h2 style={{marginBottom: "0", marginTop: "0",}}>to sign out!</h2>
            </div>
            {/* <h2 style={{marginBottom: "0px",}}>You're already signed in amigo, use the nav bar <h2 className={styles["inline-header2-underline"]}>above</h2> to dive head first into the action!</h2>
            <p style={{fontSize: "20px",}}>or</p>
            <h2 style={{marginTop: "0px",}}>Click the Sign Out button in the <h2 className={styles["inline-header2-underline"]}>top right</h2> to sign out!</h2> */}
        </div>
    )
   }
    return (
        <div className={styles["sign-in-container"]}>
            <SignInComponent callback={callbackUrl}/>
        </div>
    )
};