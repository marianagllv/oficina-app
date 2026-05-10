'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('')

  async function fazerLogin(e: React.FormEvent) {
    e.preventDefault()
    setMensagem('Entrando...')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    })

    if (error) {
      setMensagem('Email ou senha inválidos.')
      return
    }

    setMensagem('Login feito! Indo para o painel...')
    window.location.href = '/admin'
  }

  return (
    <main className="min-h-screen bg-[#4b0d16] flex items-center justify-center p-6">
      <div className="bg-[#f4dfbd] w-full max-w-md rounded-3xl p-8 shadow-2xl">
        <div className="text-center">
          <img src="/logo.jpeg" alt="WM Funilaria" className="w-24 h-24 mx-auto object-contain" />

          <h1 className="text-4xl font-black text-[#2b1a1a] mt-5">
            Login Admin
          </h1>

          <p className="text-[#5c4033] mt-2">
            Área restrita da oficina
          </p>
        </div>

        <form onSubmit={fazerLogin} className="grid gap-5 mt-8">
          <input
            type="email"
            placeholder="Seu email"
            className="p-4 rounded-2xl border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Sua senha"
            className="p-4 rounded-2xl border"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button className="bg-[#df6f2a] hover:bg-[#c95f20] transition text-white p-4 rounded-2xl font-black">
            Entrar
          </button>

          {mensagem && (
            <p className="text-center font-bold text-[#2b1a1a]">
              {mensagem}
            </p>
          )}
        </form>
      </div>
    </main>
  )
}