'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from './ui/breadcrumb'
import { MobileSidebar } from './sidebar'

function BreadcumbHeader() {
  const pathname = usePathname()
  const paths = pathname === '/' ? [''] : pathname.split('/')
  return (
    <div className="flex items-center flex-start">
      <MobileSidebar />
      <Breadcrumb>
        <BreadcrumbList>
          {paths.map((path, index) => (
            <React.Fragment key={index}>
              <BreadcrumbLink className="capitalize" href={`/${path}`}>
                {path === '' ? 'home' : path}
              </BreadcrumbLink>

              {index !== paths.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

export default BreadcumbHeader
