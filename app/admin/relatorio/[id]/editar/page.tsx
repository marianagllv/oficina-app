'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useParams, useRouter } from 'next/navigation'

export default function EditarStatusPage() {
  const params = useParams()
  const router = useRouter()

  const id = params.id as string

  const [status, setStatus] = useState('Em análise')
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    carregarRelatorio()
  }, [])

  async function carregarRelatorio() {
    const { data, error } = await supabase
      .from('relatorios')
      .select('status')
      .eq('id', id)
      .single()

    if (error) {
      alert('Erro ao carregar relatório')
      console.log(error)
      return
    }

    setStatus(data.status || 'Em análise')
    setCarregando(false)
  }

  async function salvarStatus() {
    const { error } = await supabase
      .from('relatorios')
      .update({ status })
      .eq('id', id)

    if (error) {
      alert('Erro ao salvar status')
      console.log(error)
      return
    }

    alert('Status atualizado!')
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
      <div className="max-w-xl mx-auto bg-[#f4dfbd] text-[#2b1a1a] p-8 rounded-3xl shadow-2xl">
        <a
          href={`/admin/relatorio/${id}`}
          className="text-[#df6f2a] font-bold"
        >
          ← Voltar para o relatório
        </a>

        <h1 className="text-3xl font-black mt-6">
          Editar Status
        </h1>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full mt-6 p-4 rounded-2xl border bg-white"
        >
          <option>Em análise</option>
          <option>Em andamento</option>
          <option>Funilaria</option>
          <option>Pintura</option>
          <option>Polimento</option>
          <option>Finalizado</option>
          <option>Entregue</option>
        </select>

        <button
          onClick={salvarStatus}
          className="w-full mt-6 bg-[#df6f2a] hover:bg-[#c95f20] transition text-white p-4 rounded-2xl font-black"
        >
          Salvar Status
        </button>
      </div>
    </main>
  )
}