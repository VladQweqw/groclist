'use client'

import Link from "next/link";
import IsAuth from "./isAuth";

import { useRouter } from 'next/navigation';
import { getFromLocal } from "@/functions/functions"

export default function Footer() {
    const user = getFromLocal('user') || {};
    const router = useRouter();

    if(user == false) router.push('/login')

    return (
        <footer className='footer navbar'>
            <div className="footer-links">
                {user._id ?
                    <Link href={`/account/${user._id}`}>
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