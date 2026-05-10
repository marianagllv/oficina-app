'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AcompanharPage() {
  const [codigo, setCodigo] = useState('')

  const router = useRouter()

  function buscarRelatorio(e: React.FormEvent) {
    e.preventDefault()

    if (!codigo) {
      alert('Digite o código do relatório')
      return
    }

    window.location.href = `/acompanhar/${codigo}`
  }

  return (
    <main className="min-h-screen bg-[#4b0d16] flex items-center justify-center p-6">

      <div className="bg-[#f4dfbd] w-full max-w-xl rounded-3xl p-8 shadow-2xl">

        <div className="text-center">

          <img
            src="/logo.jpeg"
            alt="WM Funilaria"
            className="w-28 h-28 mx-auto object-contain"
          />

          <h1 className="text-5xl font-black text-[#2b1a1a] mt-5">
            Acompanhe seu veículo
          </h1>

          <p className="text-[#5c4033] mt-4 text-lg">
            Digite o código do relatório para acompanhar o serviço.
          </p>

        </div>

        <form
          onSubmit={buscarRelatorio}
          className="mt-10 flex flex-col gap-5"
        >

          <input
            type="text"
            placeholder="Digite o código"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="p-5 rounded-2xl border text-xl"
          />

          <button
            type="submit"
            className="bg-[#df6f2a] hover:bg-[#c95f20] transition text-white p-5 rounded-2xl font-black text-xl"
          >
            Acompanhar
          </button>

        </form>

      </div>

    </main>
  )
}