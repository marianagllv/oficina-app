import { supabase } from '@/lib/supabase'

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function RelatorioPage({ params }: Props) {
  const { id } = await params

  const { data: relatorio } = await supabase
    .from('relatorios')
    .select('*')
    .eq('id', id)
    .single()

  if (!relatorio) {
    return (
      <main className="min-h-screen bg-[#4b0d16] text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Relatório não encontrado
        </h1>
      </main>
    )
  }

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

        <a
          href="/admin"
          className="text-[#df6f2a] font-bold"
        >
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

          </div>

        </div>
      </div>
    </main>
  )
}