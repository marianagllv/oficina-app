'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AcompanharPage() {
  const [codigo, setCodigo] = useState('')
  const router = useRouter()

  function acompanhar(e: React.FormEvent) {
    e.preventDefault()

    if (!codigo) {
      alert('Digite o código do relatório')
      return
    }

    router.push(`/acompanhar/${codigo}`)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#140207] via-[#2b0610] to-[#4b0d16] flex items-center justify-center p-6">

      <div className="absolute w-96 h-96 bg-[#df6f2a]/20 blur-[120px] rounded-full"></div>

      <div className="relative bg-white/10 backdrop-blur-xl border border-white/10 w-full max-w-2xl rounded-[2rem] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)] text-center">

        <div className="bg-white p-4 rounded-3xl inline-block shadow-xl">
          <img
            src="/logo.jpeg"
            alt="WM Funilaria"
            className="w-28 h-28 object-contain"
          />
        </div>

        <p className="uppercase tracking-[5px] text-[#df6f2a] font-black mt-6 text-sm">
          WM Funilaria & Pintura
        </p>

        <h1 className="text-4xl md:text-6xl font-black text-white mt-4">
          Acompanhe seu veículo
        </h1>

        <p className="text-orange-100/80 mt-5 text-lg">
          Digite o código informado pela oficina para visualizar
          o andamento do serviço e as fotos do veículo.
        </p>

        <form
          onSubmit={acompanhar}
          className="flex flex-col gap-5 mt-10"
        >
          <input
            type="text"
            placeholder="Código do relatório"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="p-5 rounded-2xl bg-white/90 border border-white text-xl text-[#2b1a1a] outline-none"
          />

          <button
            type="submit"
            className="bg-[#df6f2a] hover:bg-[#c95f20] transition text-white p-5 rounded-2xl font-black text-xl shadow-xl"
          >
            Consultar veículo
          </button>
        </form>

        <div className="mt-8 text-orange-100/70 text-sm">
          Seu carro novo de novo.
        </div>

      </div>

    </main>
  )
}