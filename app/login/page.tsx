"use client"

import Link from "next/link"
import { useRef } from "react"
import { useRouter } from 'next/navigation';

import { setUser } from "@/store/features/auth-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { saveToLocal } from "@/functions/functions";

export default function Login() {
   const form_ref = useRef<HTMLFormElement | null>(null)
   const email_error = useRef<HTMLParagraphElement | null>(null)
   const pwd_error = useRef<HTMLParagraphElement | null>(null)
   const { push } = useRouter();

   const dispatch = useDispatch<AppDispatch>()

   
   async function login_user() {
      const email = form_ref.current!.email.value
      const password = form_ref.current!.pwd.value

      function toggleEmailError(message: string, toggle: boolean = true) {
         if (toggle) {
            form_ref.current!.email.classList.add('input-error')
         } else {
            form_ref.current!.email.classList.remove('input-error')
         }

         email_error.current!.innerText = message
      }

      function togglePwdError(message: string, toggle: boolean = true) {
         if (toggle) {
            form_ref.current!.pwd.classList.add('input-error')
         } else {
            form_ref.current!.pwd.classList.remove('input-error')
         }

         pwd_error.current!.innerText = message
      }


      await fetch("localhost:3000" + '/login', {
         method: 'POST',
         body: JSON.stringify({
            email,
            password,
         }),
         credentials: 'include',
         headers: {
            'Content-Type': 'application/json',
         }
      })
         .then((resp) => resp.json())
         .then((data) => {
            if (data.detail) {               
               saveToLocal('user', data.user)
               push(`/`)
            } else if (data.error) {
               if (data.error.email) {
                  toggleEmailError(data.error.email, true)
                  togglePwdError('', false)
               }
               if (data.error.password) {
                  togglePwdError(data.error.password, true)
                  toggleEmailError('', false)
               }
            }
         })
         .catch((err) => {
            pwd_error.current!.innerText = 'There was an error, please try again later.'
            console.log(err);

            // push(`/`)
         })

   }

   return (
      <main className="main">

         <div className="form-container center">
            <h1 className="title">Login</h1>

            <form
               ref={form_ref}
               className="form">
               <div className="input">
                  <input type="email" name="email" className="input-field" placeholder="Your email" id="email" />
                  <p
                     ref={email_error}
                     className="email-error error-text"></p>
               </div>
               <div className="input">
                  <input type="password" name="pwd" className="input-field" placeholder="Your password" id="pwd" />
                  <p
                     ref={pwd_error}
                     className="email-error error-text"></p>
               </div>

               <div className="button-wrapper">
                  <button
                     onClick={() => login_user()}
                     type="button"
                     className="submit-btn primary-btn btn">Log in</button>
                  <p>Don`t have an account? <Link href={'register'} >create one.</Link></p>
               </div>
            </form>
         </div>

      </main>
   )
}