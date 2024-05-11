"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
const background_svg = require('../../assets/background.svg')
import { useRouter } from 'next/navigation';

export const endpoint = 'http://localhost:3000'

export default function Login() {
   const form_ref = useRef<HTMLFormElement | null>(null)
   const email_error = useRef<HTMLParagraphElement | null>(null)
   const pwd_error = useRef<HTMLParagraphElement | null>(null)
   const { push } = useRouter();

   async function login_user() {
      const email = form_ref.current!.email.value
      const password = form_ref.current!.pwd.value

      function toggleEmailError(message: string, toggle: boolean = true) {
         if(toggle) {
            form_ref.current!.email.classList.add('input-error')
         }else {
            form_ref.current!.email.classList.remove('input-error')
         }
         
         email_error.current!.innerText = message
      }

      function togglePwdError(message: string, toggle: boolean = true) {
         if(toggle) {
            form_ref.current!.pwd.classList.add('input-error')
         }else {
            form_ref.current!.pwd.classList.remove('input-error')
         }
         
         pwd_error.current!.innerText = message
      }

         
      await fetch(endpoint + '/login', {
         method: 'POST',
         body: JSON.stringify({
            email,
            password,
         }),
         headers: {
            'Content-Type': 'application/json'
         }
      })
      .then((resp) => resp.json())
      .then((data) => {
         if(data.detail) {
            
            push(`/`)

         }else if(data.error) {
            if(data.error.email) {
               toggleEmailError(data.error.email, true)
               togglePwdError('', false)
            }
            if(data.error.password) {
               togglePwdError(data.error.password, true)
               toggleEmailError('', false)
            }
         }
      })
      .catch((err) => {
         console.log(`Error: ${err}`);
            console.log(err);
            
      })
   }

   return(
    <main className="main">
         {/* <Image 
         src={background_svg}
         className="svg background-svg background-svg-top"
         alt="background-detail"
         />

         <Image 
         src={background_svg}
         className="svg background-svg background-svg-bottom"
         alt="background-detail"
         /> */}

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