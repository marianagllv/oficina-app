'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useParams } from 'next/navigation'

type Relatorio = {
  id: number
  cliente: string
  telefone?: string
  veiculo: string
  status: string
  servico: string
  observacoes?: string
  fotos?: string
}

export default function RelatorioPage() {
  const params = useParams()
  const id = params.id as string

  const [relatorio, setRelatorio] = useState<Relatorio | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [enviando, setEnviando] = useState(false)

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
      console.log(error)
      setRelatorio(null)
      setCarregando(false)
      return
    }

    setRelatorio(data)
    setCarregando(false)
  }

  async function enviarFotos(e: React.ChangeEvent<HTMLInputElement>) {
    if (!relatorio) return

    const arquivos = e.target.files
    if (!arquivos || arquivos.length === 0) return

    setEnviando(true)

    const fotosAtuais = relatorio.fotos
      ? relatorio.fotos.split(',').filter(Boolean)
      : []

    const novasUrls: string[] = []

    for (const arquivo of Array.from(arquivos)) {
      const nomeArquivo = `${relatorio.id}-${Date.now()}-${arquivo.name}`

      const { error: uploadError } = await supabase.storage
        .from('fotos-relatorios')
        .upload(nomeArquivo, arquivo)

      if (uploadError) {
        console.log(uploadError)
        alert('Erro ao enviar uma foto.')
        setEnviando(false)
        return
      }

      const { data } = supabase.storage
        .from('fotos-relatorios')
        .getPublicUrl(nomeArquivo)

      novasUrls.push(data.publicUrl)
    }

    const fotosAtualizadas = [...fotosAtuais, ...novasUrls].join(',')

    const { error } = await supabase
      .from('relatorios')
      .update({ fotos: fotosAtualizadas })
      .eq('id', relatorio.id)

    if (error) {
      console.log(error)
      alert('Erro ao salvar fotos no relatório.')
      setEnviando(false)
      return
    }

    setRelatorio({
      ...relatorio,
      fotos: fotosAtualizadas,
    })

    setEnviando(false)
    alert('Fotos enviadas com sucesso!')
  }

  if (carregando) {
    return (
      <main className="min-h-screen bg-[#4b0d16] text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">Carregando...</h1>
      </main>
    )
  }

  if (!relatorio) {
    return (
      <main className="min-h-screen bg-[#4b0d16] text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">Relatório não encontrado</h1>
      </main>
    )
  }

  const fotos = relatorio.fotos
    ? relatorio.fotos.split(',').filter(Boolean)
    : []

  const telefoneLimpo = relatorio.telefone
    ? String(relatorio.telefone).replace(/\D/g, '')
    : ''

  const numeroWhatsApp = telefoneLimpo.startsWith('55')
    ? telefoneLimpo
    : `55${telefoneLimpo}`

  const mensagem = `Olá, ${relatorio.cliente}! Seu código de acompanhamento é #${relatorio.id}.

Acesse:
https://oficina-app-kappa.vercel.app/acompanhar/${relatorio.id}`

  const linkWhatsApp = telefoneLimpo
    ? `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`
    : `https://wa.me/?text=${encodeURIComponent(mensagem)}`

  return (
    <main className="min-h-screen bg-[#4b0d16] text-[#fff3df] p-6">
      <div className="max-w-5xl mx-auto">
        <a href="/admin" className="text-[#df6f2a] font-bold">
          ← Voltar para o painel
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

          <div className="mt-8 grid md:grid-cols-3 gap-5">
            <div className="bg-white/70 rounded-2xl p-5">
              <p className="text-sm font-bold text-[#df6f2a] uppercase">
                Status
              </p>
              <p className="mt-2 text-xl font-semibold">
                {relatorio.status}
              </p>
            </div>

            <div className="bg-white/70 rounded-2xl p-5">
              <p className="text-sm font-bold text-[#df6f2a] uppercase">
                Serviço
              </p>
              <p className="mt-2 text-xl font-semibold">
                {relatorio.servico}
              </p>
            </div>

            <div className="bg-white/70 rounded-2xl p-5">
              <p className="text-sm font-bold text-[#df6f2a] uppercase">
                Telefone
              </p>
              <p className="mt-2 text-xl font-semibold">
                {relatorio.telefone || 'Não cadastrado'}
              </p>
            </div>
          </div>

          <div className="mt-5 bg-white/70 rounded-2xl p-5">
            <p className="text-sm font-bold text-[#df6f2a] uppercase">
              Observações
            </p>
            <p className="mt-2 text-lg">
              {relatorio.observacoes || 'Nenhuma observação cadastrada.'}
            </p>
          </div>

          <div className="mt-5 bg-white/70 rounded-2xl p-5">
            <p className="text-sm font-bold text-[#df6f2a] uppercase">
              Fotos do veículo
            </p>

            <label className="inline-block mt-4 bg-[#df6f2a] hover:bg-[#c95f20] transition text-white px-6 py-4 rounded-2xl font-black cursor-pointer">
              Adicionar fotos

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={enviarFotos}
                className="hidden"
              />
            </label>

            {enviando && (
              <p className="mt-3 font-bold text-[#df6f2a]">
                Enviando fotos...
              </p>
            )}

            {fotos.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-4 mt-5">
                {fotos.map((foto, index) => (
                  <img
                    key={index}
                    src={foto}
                    alt={`Foto ${index + 1}`}
                    className="w-full h-56 object-cover rounded-2xl shadow-lg"
                  />
                ))}
              </div>
            ) : (
              <p className="mt-3 text-[#5c4033]">
                Nenhuma foto enviada ainda.
              </p>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <a
              href={linkWhatsApp}
              target="_blank"
              className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-4 rounded-2xl font-black text-center"
            >
              Enviar código ao cliente
            </a>

            <a
              href={`/admin/relatorio/${relatorio.id}/editar`}
              className="bg-[#df6f2a] hover:bg-[#c95f20] transition text-white px-6 py-4 rounded-2xl font-black text-center"
            >
              Editar Status
            </a>

            <a
              href={`/admin/relatorio/${relatorio.id}/excluir`}
              className="bg-red-600 hover:bg-red-700 transition text-white px-6 py-4 rounded-2xl font-black text-center"
            >
              Excluir Relatório
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}