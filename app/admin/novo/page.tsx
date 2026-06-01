'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function NovoRelatorioPage() {
  const router = useRouter()

  const [cliente, setCliente] = useState('')
  const [telefone, setTelefone] = useState('')
  const [veiculo, setVeiculo] = useState('')
  const [status, setStatus] = useState('')
  const [servico, setServico] = useState('')
  const [observacoes, setObservacoes] = useState('')

  async function salvarRelatorio(e: React.FormEvent) {
    e.preventDefault()

    const { error } = await supabase.from('relatorios').insert({
      cliente,
      telefone,
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
    <main className="min-h-screen bg-gradient-to-br from-[#140207] via-[#2b0610] to-[#4b0d16] text-[#fff3df] p-6">

      <div className="absolute w-96 h-96 bg-[#df6f2a]/20 blur-[120px] rounded-full"></div>

      <div className="relative max-w-4xl mx-auto">

        <a
          href="/admin"
          className="inline-block text-[#df6f2a] font-black hover:text-orange-300 transition"
        >
          ← Voltar para o painel
        </a>

        <div className="flex flex-col md:flex-row md:items-center gap-5 mt-8">

          <div className="bg-white p-3 rounded-3xl shadow-xl w-fit">
            <img
              src="/logo.jpeg"
              alt="WM Funilaria"
              className="w-24 h-24 object-contain"
            />
          </div>

          <div>
            <p className="uppercase tracking-[4px] text-[#df6f2a] font-black text-sm">
              WM Funilaria & Pintura
            </p>

            <h1 className="text-4xl md:text-6xl font-black mt-2">
              Novo Relatório
            </h1>

            <p className="text-orange-100/80 mt-2">
              Cadastre as informações do veículo para acompanhamento do cliente.
            </p>
          </div>

        </div>

        <form
          onSubmit={salvarRelatorio}
          className="mt-10 bg-white/10 backdrop-blur-xl border border-white/10 text-white rounded-[2rem] p-6 md:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.45)] grid gap-5"
        >
          <input
            className="p-4 rounded-2xl bg-white/90 border border-white text-[#2b1a1a] outline-none"
            placeholder="Nome do cliente"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />

          <input
            className="p-4 rounded-2xl bg-white/90 border border-white text-[#2b1a1a] outline-none"
            placeholder="Telefone do cliente com DDD. Ex: 84991107573"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />

          <input
            className="p-4 rounded-2xl bg-white/90 border border-white text-[#2b1a1a] outline-none"
            placeholder="Veículo"
            value={veiculo}
            onChange={(e) => setVeiculo(e.target.value)}
          />

          <select
            className="p-4 rounded-2xl bg-white/90 border border-white text-[#2b1a1a] outline-none"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Selecione o status</option>
            <option value="Em análise">Em análise</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Funilaria">Funilaria</option>
            <option value="Pintura">Pintura</option>
            <option value="Polimento">Polimento</option>
            <option value="Finalizado">Finalizado</option>
            <option value="Entregue">Entregue</option>
          </select>

          <input
            className="p-4 rounded-2xl bg-white/90 border border-white text-[#2b1a1a] outline-none"
            placeholder="Serviço"
            value={servico}
            onChange={(e) => setServico(e.target.value)}
          />

          <textarea
            className="p-4 rounded-2xl bg-white/90 border border-white text-[#2b1a1a] outline-none min-h-32"
            placeholder="Observações"
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
          />

          <button className="bg-[#df6f2a] hover:bg-[#c95f20] text-white transition p-5 rounded-2xl font-black shadow-xl text-lg">
            Salvar Relatório
          </button>
        </form>

      </div>
    </main>
  )
}