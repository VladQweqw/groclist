"use client"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
const background_svg = require('../../assets/background.svg')
import { useRouter } from 'next/navigation';

export const endpoint = 'http://localhost:3000'

export default function Register() {
   const form_ref = useRef<HTMLFormElement | null>(null)
   const email_error = useRef<HTMLParagraphElement | null>(null)
   const pwd_error = useRef<HTMLParagraphElement | null>(null)
   const { push } = useRouter();

   async function register_user() {
      const email = form_ref.current!.email.value
      const nickname = form_ref.current!.nickname.value
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

         
      await fetch(endpoint + '/register', {
         method: 'POST',
         body: JSON.stringify({
            email,
            nickname,
            password,
         }),
         headers: {
            'Content-Type': 'application/json'
         }
      })
      .then((resp) => resp.json())
      .then((data) => {
         if(data.detail) {
            push('/login')
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
            <h1 className="title">Sign up</h1>
            
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
                  <input type="text" name="nickname" className="input-field" placeholder="Choose a nickname" id="nickname" />
               </div>
               <div className="input">
                  <input type="password" name="pwd" className="input-field" placeholder="Your password" id="pwd" />
                  <p
                  ref={pwd_error}
                  className="email-error error-text"></p>
               </div>

               <div className="button-wrapper">
                  <button 
                  onClick={() => register_user()}
                  type="button"
                  className="submit-btn primary-btn btn">Create account</button>
                  <p>Already have an account? <Link href={'login'} >log in.</Link></p>
               </div>
            </form>
         </div>

    </main>
   )
}