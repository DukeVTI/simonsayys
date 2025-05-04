import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { auth, signIn, signOut } from '@/auth'

const navbar = async () => {
    const session = await auth()
    return (
        <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
            <nav className='flex items-center justify-between'>
                <Image src="/logo.png" alt='logo' height={30} width={144} />

                <div className='flex items-center gap-5 text-black' >
                    {session && session?.user ? (
                        <>
                            <Link href='/startup/create'>
                                <span>Create</span>
                            </Link>

                            <form action={async()=> {
                                "use server";
                                await signOut({redirectTo:'/'}); } 
                            }>
                                <button type='submit'>Logout</button>
                            </form>

                            <Link href={`/user/${session?.id}`}>
                                <span>{session?.user?.name}</span>
                            </Link>
                        </>
                    ): (
                        <form action={async()=> {
                            "use server";
                            await signIn('github')}}>
                                <button type='submit'>Login</button>
                            </form>
                    )}

                </div>
            </nav>
        </header>
    )
}

export default navbar