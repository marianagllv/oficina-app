'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function NovoRelatorioPage() {
  const router = useRouter()

  const [cliente, setCliente] = useState('')
  const [veiculo, setVeiculo] = useState('')
  const [status, setStatus] = useState('')
  const [servico, setServico] = useState('')
  const [observacoes, setObservacoes] = useState('')

  async function salvarRelatorio(e: React.FormEvent) {
    e.preventDefault()

    const { error } = await supabase.from('relatorios').insert({
      cliente,
      veiculo,
      status,
      servico,
      observacoes,
    })

    if (error) {
      alert('Erro ao salvar relatório')
      console.log(error)
      return
    }

    alert('Relatório criado com sucesso!')
    router.push('/admin')
  }

  return (
    <main className="min-h-screen bg-[#4b0d16] text-[#fff3df] p-6">
      <div className="max-w-3xl mx-auto">

        <a
          href="/admin"
          className="text-[#df6f2a] font-bold"
        >
          ← Voltar para o painel
        </a>

        <div className="flex items-center gap-4 mt-6">

          <img
            src="/logo.jpeg"
            alt="WM Funilaria"
            className="w-20 h-20 object-contain"
          />

          <div>
            <h1 className="text-4xl font-black">
              Novo Relatório
            </h1>

            <p className="text-[#f4dfbd] mt-1">
              WM Funilaria & Pintura
            </p>
          </div>

        </div>

        <form
          onSubmit={salvarRelatorio}
          className="mt-8 bg-[#f4dfbd] text-[#2b1a1a] rounded-3xl p-6 shadow-2xl grid gap-5"
        >

          <input
            className="p-4 rounded-xl border"
            placeholder="Nome do cliente"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />

          <input
            className="p-4 rounded-xl border"
            placeholder="Veículo"
            value={veiculo}
            onChange={(e) => setVeiculo(e.target.value)}
          />

          <select
            className="p-4 rounded-xl border bg-white"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">
              Selecione o status
            </option>

            <option value="Em análise">
              Em análise
            </option>

            <option value="Em andamento">
              Em andamento
            </option>

            <option value="Funilaria">
              Funilaria
            </option>

            <option value="Pintura">
              Pintura
            </option>

            <option value="Polimento">
              Polimento
            </option>

            <option value="Finalizado">
              Finalizado
            </option>

            <option value="Entregue">
              Entregue
            </option>
          </select>

          <input
            className="p-4 rounded-xl border"
            placeholder="Serviço"
            value={servico}
            onChange={(e) => setServico(e.target.value)}
          />

          <textarea
            className="p-4 rounded-xl border min-h-32"
            placeholder="Observações"
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
          />

          <button
            className="bg-[#df6f2a] hover:bg-[#c95f20] text-white transition p-4 rounded-2xl font-black"
          >
            Salvar Relatório
          </button>

        </form>
      </div>
    </main>
  )
}