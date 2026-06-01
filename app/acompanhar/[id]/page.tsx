'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useParams } from 'next/navigation'

type Relatorio = {
  id: number
  cliente: string
  veiculo: string
  status: string
  servico: string
  observacoes?: string
  fotos?: string
}

export default function ClienteRelatorio() {
  const params = useParams()
  const id = params.id as string

  const [relatorio, setRelatorio] = useState<Relatorio | null>(null)

  useEffect(() => {
    async function carregar() {
      const { data } = await supabase
        .from('relatorios')
        .select('*')
        .eq('id', id)
        .single()

      setRelatorio(data)
    }

    carregar()
  }, [id])

  if (!relatorio) {
    return (
      <main className="min-h-screen bg-[#4b0d16] text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">Carregando relatório...</h1>
      </main>
    )
  }

  const fotos = relatorio.fotos
    ? relatorio.fotos.split(',').filter(Boolean)
    : []

  return (
    <main className="min-h-screen bg-[#4b0d16] text-[#fff3df] p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-[#f4dfbd] text-[#2b1a1a] rounded-3xl p-8 shadow-2xl">
          <p className="text-[#df6f2a] font-black">
            WM Funilaria & Pintura
          </p>

          <h1 className="text-5xl font-black mt-2">
            Acompanhamento do Serviço
          </h1>

          <p className="mt-4 text-[#5c4033] font-semibold">
            Código do relatório: #{relatorio.id}
          </p>

          <div className="mt-8 grid md:grid-cols-2 gap-5">
            <div className="bg-white/70 rounded-2xl p-5">
              <p className="text-sm font-bold text-[#df6f2a] uppercase">
                Cliente
              </p>
              <p className="mt-2 text-xl font-semibold">
                {relatorio.cliente}
              </p>
            </div>

            <div className="bg-white/70 rounded-2xl p-5">
              <p className="text-sm font-bold text-[#df6f2a] uppercase">
                Veículo
              </p>
              <p className="mt-2 text-xl font-semibold">
                {relatorio.veiculo}
              </p>
            </div>
          </div>

          <div className="mt-5 bg-white/70 rounded-2xl p-6">
            <p className="text-sm font-bold text-[#df6f2a] uppercase">
              Status atual
            </p>

            <p className="mt-3 text-4xl font-black">
              {relatorio.status}
            </p>
          </div>

          <div className="mt-5 bg-white/70 rounded-2xl p-5">
            <p className="text-sm font-bold text-[#df6f2a] uppercase">
              Serviço
            </p>
            <p className="mt-3 text-xl">
              {relatorio.servico}
            </p>
          </div>

          <div className="mt-5 bg-white/70 rounded-2xl p-5">
            <p className="text-sm font-bold text-[#df6f2a] uppercase">
              Observações
            </p>
            <p className="mt-3 text-lg">
              {relatorio.observacoes || 'Sem observações no momento.'}
            </p>
          </div>

          <div className="mt-5 bg-white/70 rounded-2xl p-5">
            <p className="text-sm font-bold text-[#df6f2a] uppercase">
              Fotos do serviço
            </p>

            {fotos.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-4 mt-5">
                {fotos.map((foto, index) => (
                  <img
                    key={index}
                    src={foto}
                    alt={`Foto ${index + 1}`}
                    className="w-full h-52 object-cover rounded-2xl"
                  />
                ))}
              </div>
            ) : (
              <p className="mt-3 text-[#5c4033]">
                Nenhuma foto disponível ainda.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}