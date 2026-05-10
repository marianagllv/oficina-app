'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const SENHA_ADMIN = 'wm2026'

type Relatorio = {
  id: number
  cliente: string
  veiculo: string
  status: string
  servico: string
  observacoes?: string
}

export default function AdminPage() {

  const [autorizado, setAutorizado] = useState(false)
  const [senha, setSenha] = useState('')

  const [relatorios, setRelatorios] = useState<Relatorio[]>([])

  const total = relatorios.length

  const finalizados = relatorios.filter(
    (r) => r.status === 'Finalizado'
  ).length

  const andamento = relatorios.filter(
    (r) => r.status === 'Em andamento'
  ).length

  const pintura = relatorios.filter(
    (r) => r.status === 'Pintura'
  ).length

  function entrar() {
    if (senha === SENHA_ADMIN) {
      setAutorizado(true)
    } else {
      alert('Senha incorreta')
    }
  }

  useEffect(() => {
    carregarRelatorios()
  }, [])

  async function carregarRelatorios() {

    const { data } = await supabase
      .from('relatorios')
      .select('*')
      .order('id', { ascending: false })

    setRelatorios(data || [])
  }

  if (!autorizado) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#3b0711] to-[#1f0308] flex items-center justify-center p-6">

        <div className="bg-gradient-to-br from-[#f4dfbd] to-[#e7cfa5] p-8 rounded-3xl w-full max-w-md shadow-2xl border border-white/30">

          <h1 className="text-4xl font-black text-[#2b1a1a]">
            Área Admin
          </h1>

          <p className="text-[#5c4033] mt-3">
            Digite a senha para acessar o painel.
          </p>

          <input
            type="password"
            placeholder="Digite a senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-4 rounded-2xl border mt-6 bg-white/80 backdrop-blur-sm"
          />

          <button
            onClick={entrar}
            className="w-full bg-[#df6f2a] hover:bg-[#c95f20] transition duration-300 text-white p-4 rounded-2xl font-black mt-4 shadow-lg hover:scale-[1.02]"
          >
            Entrar
          </button>

        </div>

      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#3b0711] to-[#1f0308] p-6 text-[#fff3df]">

      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          <div>

            <p className="uppercase text-[#df6f2a] font-black tracking-[3px]">
              Painel administrativo
            </p>

            <h1 className="text-5xl font-black mt-2 drop-shadow-lg">
              WM Funilaria
            </h1>

          </div>

          <Link
            href="/admin/novo"
            className="bg-[#df6f2a] hover:bg-[#c95f20] transition duration-300 px-6 py-4 rounded-2xl font-black text-center shadow-2xl hover:scale-[1.03]"
          >
            Novo Relatório
          </Link>

        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-10">

          <div className="bg-gradient-to-br from-[#f4dfbd] to-[#e7cfa5] text-[#2b1a1a] p-6 rounded-3xl shadow-2xl border border-white/40">
            <p className="text-sm uppercase font-black text-[#df6f2a]">
              Total
            </p>

            <h2 className="text-5xl font-black mt-3">
              {total}
            </h2>
          </div>

          <div className="bg-gradient-to-br from-[#f4dfbd] to-[#e7cfa5] text-[#2b1a1a] p-6 rounded-3xl shadow-2xl border border-white/40">
            <p className="text-sm uppercase font-black text-[#df6f2a]">
              Em andamento
            </p>

            <h2 className="text-5xl font-black mt-3">
              {andamento}
            </h2>
          </div>

          <div className="bg-gradient-to-br from-[#f4dfbd] to-[#e7cfa5] text-[#2b1a1a] p-6 rounded-3xl shadow-2xl border border-white/40">
            <p className="text-sm uppercase font-black text-[#df6f2a]">
              Pintura
            </p>

            <h2 className="text-5xl font-black mt-3">
              {pintura}
            </h2>
          </div>

          <div className="bg-gradient-to-br from-[#f4dfbd] to-[#e7cfa5] text-[#2b1a1a] p-6 rounded-3xl shadow-2xl border border-white/40">
            <p className="text-sm uppercase font-black text-[#df6f2a]">
              Finalizados
            </p>

            <h2 className="text-5xl font-black mt-3">
              {finalizados}
            </h2>
          </div>

        </div>

        <div className="grid gap-6 mt-10">

          {relatorios.map((relatorio) => (

            <Link
              key={relatorio.id}
              href={`/admin/relatorio/${relatorio.id}`}
              className="bg-gradient-to-br from-[#f4dfbd] to-[#e7cfa5] text-[#2b1a1a] rounded-3xl p-6 shadow-2xl hover:scale-[1.02] hover:-translate-y-1 transition duration-300 border border-white/40 backdrop-blur-sm"
            >

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                <div>

                  <p className="text-[#df6f2a] font-black">
                    RELATÓRIO #{relatorio.id}
                  </p>

                  <h2 className="text-4xl font-black mt-2">
                    {relatorio.cliente}
                  </h2>

                  <p className="text-[#5c4033] text-xl mt-2 font-semibold">
                    {relatorio.veiculo}
                  </p>

                </div>

                <div className="bg-white/70 rounded-2xl px-5 py-4 backdrop-blur-sm">

                  <p className="text-sm uppercase font-black text-[#df6f2a]">
                    Status
                  </p>

                  <p className="text-2xl font-black mt-1">
                    {relatorio.status}
                  </p>

                </div>

              </div>

              <div className="mt-5">

                <p className="text-sm uppercase font-black text-[#df6f2a]">
                  Serviço
                </p>

                <p className="mt-2 text-lg">
                  {relatorio.servico}
                </p>

              </div>

              {relatorio.observacoes && (

                <div className="mt-5">

                  <p className="text-sm uppercase font-black text-[#df6f2a]">
                    Observações
                  </p>

                  <p className="mt-2 text-lg">
                    {relatorio.observacoes}
                  </p>

                </div>

              )}

            </Link>

          ))}

        </div>

      </div>

    </main>
  )
}