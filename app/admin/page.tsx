'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Relatorio = {
  id: number
  cliente: string
  veiculo: string
  status: string
  servico: string
  observacoes?: string
}

export default function AdminPage() {
  const [relatorios, setRelatorios] = useState<Relatorio[]>([])

  useEffect(() => {
    buscarRelatorios()
  }, [])

  async function buscarRelatorios() {
    const { data, error } = await supabase
      .from('relatorios')
      .select('*')
      .order('id', { ascending: false })

    if (error) {
      console.log(error)
      return
    }

    setRelatorios(data || [])
  }

  return (
    <main className="min-h-screen bg-[#4b0d16] text-[#fff3df]">
      <div className="max-w-7xl mx-auto p-6">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">

          <div className="flex items-center gap-5">

            <img
              src="/logo.jpeg"
              alt="WM Funilaria"
              className="w-28 h-28 object-contain"
            />

            <div>

              <p className="uppercase tracking-[4px] text-[#df6f2a] font-bold text-sm">
                Painel Administrativo
              </p>

              <h1 className="text-4xl md:text-5xl font-black mt-2">
                WM Funilaria & Pintura
              </h1>

              <p className="text-[#f4dfbd] mt-2">
                Clique em um relatório para abrir os detalhes.
              </p>

            </div>

          </div>

          <a
            href="/admin/novo"
            className="bg-[#df6f2a] hover:bg-[#c95f20] transition px-6 py-4 rounded-2xl font-bold text-lg shadow-lg"
          >
            + Novo Relatório
          </a>

        </div>

        <div className="grid gap-6">

          {relatorios.map((relatorio) => (

            <a
              key={relatorio.id}
              href={`/admin/relatorio/${relatorio.id}`}
              className="block bg-[#f4dfbd] text-[#2b1a1a] border-4 border-[#c7c7c7] rounded-3xl p-6 shadow-2xl hover:scale-[1.01] transition"
            >

              <div className="flex flex-col md:flex-row justify-between gap-5">

                <div>

                  <p className="text-[#df6f2a] font-black text-sm">
                    RELATÓRIO #{relatorio.id}
                  </p>

                  <h2 className="text-3xl font-black mt-2">
                    {relatorio.cliente}
                  </h2>

                  <p className="mt-2 text-lg text-[#5c4033] font-semibold">
                    {relatorio.veiculo}
                  </p>

                </div>

                <span className="bg-[#df6f2a] text-white px-5 py-3 rounded-full font-bold shadow h-fit">
                  {relatorio.status}
                </span>

              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-4">

                <div className="bg-white/70 rounded-2xl p-4">

                  <p className="text-sm font-bold text-[#df6f2a] uppercase">
                    Serviço
                  </p>

                  <p className="mt-2 text-lg font-semibold">
                    {relatorio.servico}
                  </p>

                </div>

                <div className="bg-white/70 rounded-2xl p-4">

                  <p className="text-sm font-bold text-[#df6f2a] uppercase">
                    Código
                  </p>

                  <p className="mt-2 text-lg font-semibold">
                    #{relatorio.id}
                  </p>

                </div>

              </div>

              {relatorio.observacoes && (

                <div className="mt-5 bg-white/70 rounded-2xl p-4">

                  <p className="text-sm font-bold text-[#df6f2a] uppercase">
                    Observações
                  </p>

                  <p className="mt-2 text-[#3a2b2b]">
                    {relatorio.observacoes}
                  </p>

                </div>

              )}

            </a>

          ))}

        </div>

      </div>
    </main>
  )
}