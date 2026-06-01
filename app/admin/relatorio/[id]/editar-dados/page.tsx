'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useParams, useRouter } from 'next/navigation'

export default function EditarDadosPage() {
  const params = useParams()
  const router = useRouter()

  const id = params.id as string

  const [cliente, setCliente] = useState('')
  const [telefone, setTelefone] = useState('')
  const [veiculo, setVeiculo] = useState('')
  const [servico, setServico] = useState('')
  const [observacoes, setObservacoes] = useState('')
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    carregarRelatorio()
  }, [])

  async function carregarRelatorio() {
    const { data, error } = await supabase
      .from('relatorios')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      alert('Erro ao carregar relatório')
      console.log(error)
      return
    }

    setCliente(data.cliente || '')
    setTelefone(data.telefone || '')
    setVeiculo(data.veiculo || '')
    setServico(data.servico || '')
    setObservacoes(data.observacoes || '')
    setCarregando(false)
  }

  async function salvarDados() {
    const { error } = await supabase
      .from('relatorios')
      .update({
        cliente,
        telefone,
        veiculo,
        servico,
        observacoes,
      })
      .eq('id', id)

    if (error) {
      alert('Erro ao salvar dados')
      console.log(error)
      return
    }

    alert('Dados atualizados!')
    router.push(`/admin/relatorio/${id}`)
  }

  if (carregando) {
    return (
      <main className="min-h-screen bg-[#4b0d16] text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">Carregando...</h1>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#4b0d16] text-white p-6">
      <div className="max-w-2xl mx-auto bg-[#f4dfbd] text-[#2b1a1a] p-8 rounded-3xl shadow-2xl">
        <a
          href={`/admin/relatorio/${id}`}
          className="text-[#df6f2a] font-bold"
        >
          ← Voltar para o relatório
        </a>

        <h1 className="text-4xl font-black mt-6">
          Editar Dados
        </h1>

        <div className="grid gap-5 mt-8">
          <input
            className="p-4 rounded-xl border"
            placeholder="Nome do cliente"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />

          <input
            className="p-4 rounded-xl border"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />

          <input
            className="p-4 rounded-xl border"
            placeholder="Veículo"
            value={veiculo}
            onChange={(e) => setVeiculo(e.target.value)}
          />

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
            onClick={salvarDados}
            className="bg-[#df6f2a] hover:bg-[#c95f20] transition text-white p-4 rounded-2xl font-black"
          >
            Salvar Dados
          </button>
        </div>
      </div>
    </main>
  )
}