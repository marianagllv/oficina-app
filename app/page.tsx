export default function Home() {
  const whatsappLink = `https://wa.me/5584992316969?text=${encodeURIComponent(
    'Olá! Vim pelo site da WM Funilaria & Pintura e gostaria de solicitar um orçamento.'
  )}`

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#140207] via-[#2b0610] to-[#4b0d16] text-white overflow-hidden">
      <div className="absolute top-20 left-10 w-80 h-80 bg-[#df6f2a]/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#f4dfbd]/10 blur-[120px] rounded-full"></div>

      <section className="relative max-w-7xl mx-auto px-6 py-8">
        <header className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="bg-white p-3 rounded-3xl shadow-2xl">
              <img
                src="/logo.jpeg"
                alt="WM Funilaria & Pintura"
                className="w-24 h-24 object-contain"
              />
            </div>

            <div>
              <p className="uppercase tracking-[4px] text-[#df6f2a] font-black text-sm">
                Desde 2022
              </p>

              <h1 className="text-3xl md:text-5xl font-black">
                WM Funilaria & Pintura
              </h1>
            </div>
          </div>

          <a
            href="/login"
            className="bg-white/10 hover:bg-white/20 border border-white/10 transition px-6 py-4 rounded-2xl font-black shadow-xl"
          >
            Área Admin
          </a>
        </header>

        <section className="grid md:grid-cols-2 gap-12 items-center mt-20">
          <div>
            <p className="uppercase tracking-[4px] text-[#df6f2a] font-black">
              Funilaria • Pintura • Polimento
            </p>

            <h2 className="text-5xl md:text-7xl font-black mt-5 leading-tight">
              Excelência em funilaria e pintura automotiva.
            </h2>

            <p className="text-[#f4dfbd] text-lg mt-6 leading-8 max-w-xl">
              Serviços automotivos com acabamento profissional, atenção aos
              detalhes e acompanhamento online para o cliente.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href={whatsappLink}
                target="_blank"
                className="bg-[#df6f2a] hover:bg-[#c95f20] transition px-6 py-4 rounded-2xl font-black shadow-xl hover:scale-105"
              >
                Solicitar orçamento
              </a>

              <a
                href="/acompanhar"
                className="bg-[#f4dfbd] hover:bg-white text-[#2b1a1a] transition px-6 py-4 rounded-2xl font-black shadow-xl hover:scale-105"
              >
                Acompanhar serviço
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-10 max-w-xl">
              <div className="bg-white/10 border border-white/10 rounded-3xl p-5 text-center">
                <p className="text-3xl font-black text-[#df6f2a]">+2</p>
                <p className="text-sm text-orange-100/80 mt-1">anos</p>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-3xl p-5 text-center">
                <p className="text-3xl font-black text-[#df6f2a]">100%</p>
                <p className="text-sm text-orange-100/80 mt-1">dedicação</p>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-3xl p-5 text-center">
                <p className="text-3xl font-black text-[#df6f2a]">Online</p>
                <p className="text-sm text-orange-100/80 mt-1">
                  acompanhamento
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-[#df6f2a]/20 blur-[80px] rounded-full"></div>

            <div className="relative bg-white/10 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
              <div className="bg-[#f4dfbd] rounded-[2rem] p-8">
                <img
                  src="/logo.jpeg"
                  alt="WM Funilaria & Pintura"
                  className="w-full max-w-sm mx-auto rounded-3xl object-contain"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-5">
                <div className="bg-white/10 rounded-3xl p-5">
                  <p className="text-[#df6f2a] font-black">Acabamento</p>
                  <p className="text-orange-100/80 text-sm mt-1">
                    Pintura e polimento
                  </p>
                </div>

                <div className="bg-white/10 rounded-3xl p-5">
                  <p className="text-[#df6f2a] font-black">Relatório</p>
                  <p className="text-orange-100/80 text-sm mt-1">
                    Cliente acompanha online
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <p className="uppercase tracking-[4px] text-[#df6f2a] font-black text-sm">
            Serviços
          </p>

          <h3 className="text-4xl md:text-5xl font-black mt-2">
            O que fazemos
          </h3>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              [
                'Funilaria',
                'Reparos em peças, amassados e recuperação da lataria.',
              ],
              [
                'Pintura',
                'Pintura automotiva com acabamento profissional.',
              ],
              [
                'Polimento',
                'Revitalização da pintura e brilho do veículo.',
              ],
            ].map(([titulo, texto]) => (
              <div
                key={titulo}
                className="bg-[#f4dfbd] text-[#2b1a1a] rounded-3xl p-8 shadow-2xl hover:-translate-y-2 transition"
              >
                <h4 className="text-2xl font-black text-[#df6f2a]">
                  {titulo}
                </h4>

                <p className="mt-4 leading-7">{texto}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 mb-10 bg-white/10 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="uppercase tracking-[4px] text-[#df6f2a] font-black text-sm">
                Orçamento
              </p>

              <h3 className="text-4xl font-black mt-2">
                Solicite seu orçamento
              </h3>

              <p className="mt-4 text-[#f4dfbd] text-lg">
                Fale com a WM Funilaria & Pintura pelo WhatsApp.
              </p>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              className="bg-[#df6f2a] hover:bg-[#c95f20] text-white transition px-8 py-5 rounded-2xl font-black shadow-xl text-center"
            >
              Falar no WhatsApp
            </a>
          </div>
        </section>
      </section>
    </main>
  )
}