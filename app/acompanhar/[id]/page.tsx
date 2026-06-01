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
      <main className="min-h-screen bg-[#4b0d16] text-white flex items-center justify-center p-6">
        <div className="text-center">
          <img
            src="/logo.jpeg"
            alt="WM Funilaria & Pintura"
            className="w-28 h-28 object-contain mx-auto mb-5 rounded-2xl"
          />

          <h1 className="text-3xl font-black">
            Carregando relatório...
          </h1>
        </div>
      </main>
    )
  }

  const fotos = relatorio.fotos
    ? relatorio.fotos.split(',').filter(Boolean)
    : []

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#4b0d16] via-[#2b0610] to-[#140207] text-[#fff3df] p-6">
      <div className="max-w-5xl mx-auto">

        <header className="text-center mb-8">
          <img
            src="/logo.jpeg"
            alt="WM Funilaria & Pintura"
            className="w-32 h-32 object-contain mx-auto rounded-3xl shadow-2xl"
          />

          <p className="mt-5 uppercase tracking-[3px] text-[#df6f2a] font-black">
            WM Funilaria & Pintura
          </p>

          <h1 className="text-4xl md:text-6xl font-black mt-3">
            Acompanhamento do Serviço
          </h1>

          <p className="mt-4 text-[#f4dfbd] font-semibold">
            Código do relatório: #{relatorio.id}
          </p>
        </header>

        <section className="bg-[#f4dfbd] text-[#2b1a1a] rounded-[2rem] p-6 md:p-8 shadow-2xl border border-white/20">

          <div className="bg-white rounded-[2rem] p-6 shadow-xl text-center">
            <p className="text-sm font-black text-[#df6f2a] uppercase tracking-[2px]">
              Status atual
            </p>

            <h2 className="mt-3 text-4xl md:text-6xl font-black">
              {relatorio.status}
            </h2>

            <p className="mt-3 text-[#5c4033] font-semibold">
              Seu veículo está sendo acompanhado pela equipe da WM.
            </p>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-5">
            <div className="bg-white/80 rounded-3xl p-5">
              <p className="text-sm font-bold text-[#df6f2a] uppercase">
                Cliente
              </p>

              <p className="mt-2 text-2xl font-black">
                {relatorio.cliente}
              </p>
            </div>

            <div className="bg-white/80 rounded-3xl p-5">
              <p className="text-sm font-bold text-[#df6f2a] uppercase">
                Veículo
              </p>

              <p className="mt-2 text-2xl font-black">
                {relatorio.veiculo}
              </p>
            </div>
          </div>

          <div className="mt-5 bg-white/80 rounded-3xl p-5">
            <p className="text-sm font-bold text-[#df6f2a] uppercase">
              Serviço
            </p>

            <p className="mt-3 text-xl leading-relaxed">
              {relatorio.servico}
            </p>
          </div>

          <div className="mt-5 bg-white/80 rounded-3xl p-5">
            <p className="text-sm font-bold text-[#df6f2a] uppercase">
              Observações da oficina
            </p>

            <p className="mt-3 text-lg leading-relaxed text-[#3a2525]">
              {relatorio.observacoes || 'Sem observações no momento.'}
            </p>
          </div>

          <div className="mt-5 bg-white/80 rounded-3xl p-5">
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
                    className="w-full h-64 object-cover rounded-3xl shadow-lg"
                  />
                ))}
              </div>
            ) : (
              <p className="mt-3 text-[#5c4033]">
                Nenhuma foto disponível ainda.
              </p>
            )}
          </div>

        </section>

        <footer className="text-center mt-8 text-[#f4dfbd]">
          <p className="font-black">
            WM Funilaria & Pintura
          </p>

          <p className="mt-1 text-sm">
            Seu carro novo de novo.
          </p>
        </footer>

      </div>
    </main>
  )
}