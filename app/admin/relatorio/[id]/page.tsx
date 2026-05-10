'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

type Props = {
  params: Promise<{ id: string }>
}

type Relatorio = {
  id: number
  cliente: string
  veiculo: string
  status: string
  servico: string
  observacoes?: string
  fotos?: string[]
}

export default function RelatorioPage({ params }: Props) {
  const router = useRouter()

  const [relatorio, setRelatorio] = useState<Relatorio | null>(null)
  const [novoStatus, setNovoStatus] = useState('')
  const [novasObservacoes, setNovasObservacoes] = useState('')

  useEffect(() => {
    async function iniciar() {
      const { id } = await params
      carregarRelatorio(id)
    }

    iniciar()
  }, [])

  async function carregarRelatorio(id: string) {
    const { data, error } = await supabase
      .from('relatorios')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.log(error)
      return
    }

    setRelatorio(data)
    setNovoStatus(data.status)
    setNovasObservacoes(data.observacoes || '')
  }

  async function salvarAlteracoes() {
    if (!relatorio) return

    const { error } = await supabase
      .from('relatorios')
      .update({
        status: novoStatus,
        observacoes: novasObservacoes,
      })
      .eq('id', relatorio.id)

    if (error) {
      alert('Erro ao salvar alterações')
      console.log(error)
      return
    }

    alert('Alterações salvas!')
    carregarRelatorio(String(relatorio.id))
  }

  async function enviarFoto(e: React.ChangeEvent<HTMLInputElement>) {
    if (!relatorio) return

    const arquivo = e.target.files?.[0]
    if (!arquivo) return

    const nomeArquivo = `${relatorio.id}-${Date.now()}-${arquivo.name}`

    const { error: uploadError } = await supabase.storage
      .from('fotos-relatorios')
      .upload(nomeArquivo, arquivo)

    if (uploadError) {
      alert('Erro ao enviar foto')
      console.log(uploadError)
      return
    }

    const { data } = supabase.storage
      .from('fotos-relatorios')
      .getPublicUrl(nomeArquivo)

    const fotosAtuais = relatorio.fotos || []
    const novasFotos = [...fotosAtuais, data.publicUrl]

    const { error } = await supabase
      .from('relatorios')
      .update({
        fotos: novasFotos,
      })
      .eq('id', relatorio.id)

    if (error) {
      alert('Erro ao salvar foto')
      console.log(error)
      return
    }

    alert('Foto enviada!')
    carregarRelatorio(String(relatorio.id))
  }

  async function excluirRelatorio() {
    if (!relatorio) return

    const confirmar = confirm('Tem certeza que deseja excluir este relatório?')
    if (!confirmar) return

    const { error } = await supabase
      .from('relatorios')
      .delete()
      .eq('id', relatorio.id)

    if (error) {
      alert('Erro ao excluir relatório')
      console.log(error)
      return
    }

    alert('Relatório excluído!')
    router.push('/admin')
  }

  if (!relatorio) {
    return (
      <main className="min-h-screen bg-[#4b0d16] text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">Carregando relatório...</h1>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#4b0d16] text-[#fff3df] p-6">
      <div className="max-w-5xl mx-auto">
        <a href="/admin" className="text-[#df6f2a] font-bold">
          Voltar para o painel
        </a>

        <div className="mt-8 bg-[#f4dfbd] text-[#2b1a1a] rounded-3xl p-8 shadow-2xl">
          <p className="text-[#df6f2a] font-black">
            RELATÓRIO #{relatorio.id}
          </p>

          <h1 className="text-5xl font-black mt-2">
            {relatorio.cliente}
          </h1>

          <p className="mt-3 text-2xl text-[#5c4033] font-semibold">
            {relatorio.veiculo}
          </p>

          <div className="mt-8 grid md:grid-cols-2 gap-5">
            <div className="bg-white/70 rounded-2xl p-5">
              <p className="text-sm font-bold text-[#df6f2a] uppercase">
                Status
              </p>

              <select
                className="mt-3 w-full p-4 rounded-xl border bg-white"
                value={novoStatus}
                onChange={(e) => setNovoStatus(e.target.value)}
              >
                <option value="Em análise">Em análise</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Funilaria">Funilaria</option>
                <option value="Pintura">Pintura</option>
                <option value="Polimento">Polimento</option>
                <option value="Finalizado">Finalizado</option>
                <option value="Entregue">Entregue</option>
              </select>
            </div>

            <div className="bg-white/70 rounded-2xl p-5">
              <p className="text-sm font-bold text-[#df6f2a] uppercase">
                Serviço
              </p>

              <p className="mt-3 text-xl font-semibold">
                {relatorio.servico}
              </p>
            </div>
          </div>

          <div className="mt-5 bg-white/70 rounded-2xl p-5">
            <p className="text-sm font-bold text-[#df6f2a] uppercase">
              Observações
            </p>

            <textarea
              className="mt-3 w-full p-4 rounded-xl border bg-white min-h-40"
              value={novasObservacoes}
              onChange={(e) => setNovasObservacoes(e.target.value)}
            />
          </div>

          <div className="mt-5 bg-white/70 rounded-2xl p-5">
            <p className="text-sm font-bold text-[#df6f2a] uppercase">
              Fotos do veículo
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={enviarFoto}
              className="mt-4"
            />

            <div className="grid md:grid-cols-3 gap-4 mt-5">
              {(relatorio.fotos || []).map((foto, index) => (
                <img
                  key={index}
                  src={foto}
                  alt="Foto do veículo"
                  className="w-full h-48 object-cover rounded-2xl"
                />
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-6 flex-wrap">
            <button
              onClick={salvarAlteracoes}
              className="bg-[#df6f2a] hover:bg-[#c95f20] text-white transition px-6 py-4 rounded-2xl font-black"
            >
              Salvar alterações
            </button>

            <button
              onClick={() => window.print()}
              className="bg-[#2b1a1a] hover:bg-black text-white transition px-6 py-4 rounded-2xl font-black"
            >
              Gerar PDF
            </button>

            <button
              onClick={excluirRelatorio}
              className="bg-red-700 hover:bg-red-800 text-white transition px-6 py-4 rounded-2xl font-black"
            >
              Excluir relatório
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}