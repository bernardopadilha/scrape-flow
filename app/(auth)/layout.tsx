import Logo from '@/components/logo'
import React, { ReactNode } from 'react'

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Logo />
      {children}
    </div>
  )
}

export default Layout