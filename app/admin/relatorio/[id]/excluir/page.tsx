'use client'

import { supabase } from '@/lib/supabase'
import { useParams, useRouter } from 'next/navigation'

export default function ExcluirRelatorioPage() {
  const params = useParams()
  const router = useRouter()

  const id = params.id as string

  async function excluirRelatorio() {
    const confirmar = confirm(
      'Tem certeza que deseja excluir este relatório?'
    )

    if (!confirmar) return

    const { error } = await supabase
      .from('relatorios')
      .delete()
      .eq('id', id)

    if (error) {
      alert('Erro ao excluir relatório.')
      console.log(error)
      return
    }

    alert('Relatório excluído com sucesso!')
    router.push('/admin')
  }

  return (
    <main className="min-h-screen bg-[#4b0d16] flex items-center justify-center p-6">
      <div className="bg-[#f4dfbd] text-[#2b1a1a] p-8 rounded-3xl max-w-md w-full shadow-2xl">

        <h1 className="text-3xl font-black">
          Excluir Relatório
        </h1>

        <p className="mt-4">
          Esta ação não poderá ser desfeita.
        </p>

        <button
          onClick={excluirRelatorio}
          className="w-full mt-6 bg-red-600 hover:bg-red-700 transition text-white p-4 rounded-2xl font-black"
        >
          Excluir Relatório
        </button>

        <button
          onClick={() => router.back()}
          className="w-full mt-4 bg-gray-500 hover:bg-gray-600 transition text-white p-4 rounded-2xl font-black"
        >
          Cancelar
        </button>

      </div>
    </main>
  )
}