'use client'

import { useRouter } from 'next/navigation';
import { getFromLocal } from "@/functions/functions"

import Image from "next/image"
import Link from "next/link"

const logo_image = require('../assets/logo_svg.svg')
const user_image = require('../assets/user_svg.svg')
const add_image = require('../assets/add_svg.svg')

export default function Navbar() {
  const user = getFromLocal('user') || {};
  const router = useRouter();

  let is_logged = true;
  if(user._id == undefined) is_logged = false;

  return (
    <div className="navbar">
      <Link href={'/'}>
        <div className="logo">
          <Image
            src={JSON.parse(JSON.stringify(logo_image))}
            alt="Logo image"
          />
          <p className="logo-name hidden-media">GrogList</p>
        </div></Link>
      <nav className="nav">
        <div className="nav-item">
          <Link href={'/list/add'}>
            <Image
              className='svg-img'
              src={JSON.parse(JSON.stringify(add_image))}
              alt="User image"
            />
            <p className='hidden-media'>Create list</p>
          </Link>
        </div>
        <div className="nav-item user-item">
          <Link href={`${is_logged ? `account/${user._id}` : "login"}`}>
            <Image
              className='svg-img'
              src={JSON.parse(JSON.stringify(user_image))}
              alt="User image"
            />
          </Link>
        </div>
      </nav>
    </div>
  )
}