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
      <main className="min-h-screen bg-[#4b0d16] flex items-center justify-center p-6">

        <div className="bg-[#f4dfbd] p-8 rounded-3xl w-full max-w-md shadow-2xl">

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
            className="w-full p-4 rounded-2xl border mt-6"
          />

          <button
            onClick={entrar}
            className="w-full bg-[#df6f2a] hover:bg-[#c95f20] transition text-white p-4 rounded-2xl font-black mt-4"
          >
            Entrar
          </button>

        </div>

      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#4b0d16] p-6 text-[#fff3df]">

      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          <div>

            <p className="uppercase text-[#df6f2a] font-black">
              Painel administrativo
            </p>

            <h1 className="text-5xl font-black mt-2">
              WM Funilaria
            </h1>

          </div>

          <Link
            href="/admin/novo"
            className="bg-[#df6f2a] hover:bg-[#c95f20] transition px-6 py-4 rounded-2xl font-black text-center"
          >
            Novo Relatório
          </Link>

        </div>

        <div className="grid gap-6 mt-10">

          {relatorios.map((relatorio) => (

            <Link
              key={relatorio.id}
              href={`/admin/relatorio/${relatorio.id}`}
              className="bg-[#f4dfbd] text-[#2b1a1a] rounded-3xl p-6 shadow-xl hover:scale-[1.01] transition"
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

                <div className="bg-white/70 rounded-2xl px-5 py-4">

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