import Link from "next/link";
import IsAuth from "./isAuth";

export default async function Footer() {
    const user_logged = await IsAuth()
    
    return (
        <footer className='footer navbar'>
            <div className="footer-links">
                {user_logged ?
                    <Link href={'/account'}>
                        <div className="nav-item">
                            Account
                        </div>
                    </Link>
                    :
                    <>
                        <Link href={'/login'}>
                            <div className="nav-item">
                                Login
                            </div>
                        </Link>
                        <Link href={'/register'}>
                            <div className="nav-item">
                                Sign up
                            </div>
                        </Link>
                    </>
                }
            </div>
            <p className="trademark">All right reserved GrocList@2024</p>
        </footer>
    )
}