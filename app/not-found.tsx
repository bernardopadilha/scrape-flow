import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="font-semibold mb-4 text-2xl">Página não encontrada</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          Não se preocupe, até os melhores dados às vezes se perdem na internet
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href={'/'}
            className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
          >
            <ArrowLeft className="size-4 mr-2" />
            Voltar para a Dashboard
          </Link>
        </div>
      </div>
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        Se você acredita que isso é um erro, entre em contato com nossa equipe
        de suporte
      </footer>
    </div>
  )
}

export default NotFoundPage
