import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FaBoxesStacked, FaListUl, FaBuildingUser, FaCartShopping, FaLayerGroup, FaHouseChimneyWindow } from 'react-icons/fa6'

export default function Home (): JSX.Element {
  return (
    <div className='w-full bg-zinc-800 p-5 text-white'>
      <h1 className='text-3xl font-bold mb-7'>Welcome to your admin panel</h1>

      <Link href='/products'>
        <Button variant={'outline'} className='flex items-center gap-2 w-full'>
          <FaBoxesStacked />See Products Panel
        </Button>
      </Link>
      <Link href='/categories'>
        <Button variant={'outline'} className='flex items-center gap-2 w-full mt-2'>
          <FaListUl />See Categories Panel
        </Button>
      </Link>
      <Link href='/orders'>
        <Button variant={'outline'} className='flex items-center gap-2 w-full mt-2'>
          <FaLayerGroup />See Brands Panel
        </Button>
      </Link>
      <Link href='/users'>
        <Button variant={'outline'} className='flex items-center gap-2 w-full mt-2'>
          <FaBuildingUser />See Users Panel
        </Button>
      </Link>
      <Link href='/orders'>
        <Button variant={'outline'} className='flex items-center gap-2 w-full mt-2'>
          <FaCartShopping />See Orders Panel
        </Button>
      </Link>
    </div>
  )
}
