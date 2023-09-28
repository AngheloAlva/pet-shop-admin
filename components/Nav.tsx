'use client'

import React from 'react'
import { FaBoxesStacked, FaListUl, FaBuildingUser, FaCartShopping, FaLayerGroup, FaHouseChimneyWindow } from 'react-icons/fa6'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const Nav = (): JSX.Element => {
  const activeButtonStyle = 'bg-zinc-400 text-zinc-700'
  const inactiveButtonStyle = 'bg-zinc-500 text-white'

  const pathname = usePathname()

  return (
    <nav className='flex flex-col items-start pt-5 pl-5 bg-zinc-500 text-white h-full gap-5 w-60'>
      <h1 className='font-bold text-xl mb-2'>Pet Shop</h1>
      <Link href={'/'} className={`flex gap-2 items-center text-lg font-semibold w-full rounded-l-sm px-3 py-1 transition-colors ${pathname === '/' ? activeButtonStyle : inactiveButtonStyle}`}>
        <FaHouseChimneyWindow />Dashboard
      </Link>
      <Link href={'/products'} className={`flex gap-2 items-center text-lg font-semibold w-full rounded-l-sm px-3 py-1 transition-colors ${pathname === '/products' ? activeButtonStyle : inactiveButtonStyle}`}>
        <FaBoxesStacked />Products
      </Link>
      <Link href={'/categories'} className={`flex gap-2 items-center text-lg font-semibold w-full rounded-l-sm px-3 py-1 transition-colors ${pathname === '/categories' ? activeButtonStyle : inactiveButtonStyle}`}>
        <FaListUl />Categories
      </Link>
      <Link href={'/brands'} className={`flex gap-2 items-center text-lg font-semibold w-full rounded-l-sm px-3 py-1 transition-colors ${pathname === '/brands' ? activeButtonStyle : inactiveButtonStyle}`}>
        <FaLayerGroup />Brands
      </Link>
      <Link href={'/users'} className={`flex gap-2 items-center text-lg font-semibold w-full rounded-l-sm px-3 py-1 transition-colors ${pathname === '/users' ? activeButtonStyle : inactiveButtonStyle}`}>
        <FaBuildingUser />Users
      </Link>
      <Link href={'/orders'} className={`flex gap-2 items-center text-lg font-semibold w-full rounded-l-sm px-3 py-1 transition-colors ${pathname === '/orders' ? activeButtonStyle : inactiveButtonStyle}`}>
        <FaCartShopping />Orders
      </Link>
    </nav>
  )
}

export default Nav
