'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('')

  async function fazerLogin(e: React.FormEvent) {
    e.preventDefault()

    if (usuario === 'admin' && senha === 'wm2026') {
      setMensagem('Acesso liberado!')
      window.location.href = '/admin'
      return
    }

    setMensagem('Usuário ou senha inválidos.')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#140207] via-[#2b0610] to-[#4b0d16] flex items-center justify-center p-6">

      <div className="absolute w-96 h-96 bg-[#df6f2a]/20 blur-[120px] rounded-full"></div>

      <div className="relative bg-white/10 backdrop-blur-xl border border-white/10 w-full max-w-md rounded-[2rem] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">

        <div className="text-center">

          <div className="bg-white p-3 rounded-3xl inline-block shadow-xl">
            <img
              src="/logo.jpeg"
              alt="WM Funilaria"
              className="w-24 h-24 object-contain"
            />
          </div>

          <p className="mt-5 uppercase tracking-[4px] text-[#df6f2a] font-black text-sm">
            WM Funilaria & Pintura
          </p>

          <h1 className="text-4xl font-black text-white mt-3">
            Painel WM
          </h1>

          <p className="text-orange-100/80 mt-3">
            Controle de relatórios e acompanhamento de veículos
          </p>

        </div>

        <form onSubmit={fazerLogin} className="grid gap-5 mt-8">

          <input
            type="text"
            placeholder="Usuário"
            className="p-4 rounded-2xl bg-white/90 border border-white text-[#2b1a1a] outline-none"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            className="p-4 rounded-2xl bg-white/90 border border-white text-[#2b1a1a] outline-none"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button className="bg-[#df6f2a] hover:bg-[#c95f20] transition text-white p-4 rounded-2xl font-black shadow-xl">
            Entrar no painel
          </button>

          {mensagem && (
            <p className="text-center font-bold text-white">
              {mensagem}
            </p>
          )}

        </form>

      </div>

    </main>
  )
}