'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AcompanharPage() {

  const [codigo, setCodigo] = useState('')
  const router = useRouter()

  function acompanhar(e: React.FormEvent) {
    e.preventDefault()

    if (!codigo) {
      alert('Digite o código')
      return
    }

    router.push(`/acompanhar/${codigo}`)
  }

  return (
    <main className="min-h-screen bg-[#4b0d16] flex items-center justify-center p-6">

      <div className="bg-[#f4dfbd] w-full max-w-xl rounded-3xl p-10 shadow-2xl text-center">

        <img
          src="/logo.jpeg"
          alt="WM Funilaria"
          className="w-28 h-28 object-contain mx-auto"
        />

        <p className="uppercase tracking-[4px] text-[#df6f2a] font-black mt-6 text-sm">
          Acompanhamento
        </p>

        <h1 className="text-5xl font-black text-[#2b1a1a] mt-3">
          Acompanhe seu veículo
        </h1>

        <p className="text-[#5c4033] mt-5 text-lg">
          Digite o código informado pela oficina.
        </p>

        <form
          onSubmit={acompanhar}
          className="flex flex-col gap-5 mt-10"
        >

          <input
            type="text"
            placeholder="Digite o código"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="p-5 rounded-2xl border text-xl text-[#2b1a1a]"
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