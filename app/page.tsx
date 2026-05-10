export default function Home() {
  return (
    <main className="min-h-screen bg-[#4b0d16] text-white">
      <section className="max-w-7xl mx-auto px-6 py-10">
        <header className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src="/logo.jpeg"
              alt="WM Funilaria & Pintura"
              className="w-24 h-24 object-contain"
            />

            <div>
              <p className="uppercase tracking-[4px] text-[#df6f2a] font-bold text-sm">
                Desde 2022
              </p>

              <h1 className="text-4xl md:text-6xl font-black">
                WM Funilaria & Pintura
              </h1>
            </div>
          </div>

          <a
            href="/admin"
            className="bg-[#df6f2a] hover:bg-[#c95f20] transition px-6 py-4 rounded-2xl font-black"
          >
            Área Admin
          </a>
        </header>

        <section className="grid md:grid-cols-2 gap-12 items-center mt-20">
          <div>
            <p className="uppercase tracking-[4px] text-[#df6f2a] font-bold">
              Funilaria • Pintura • Polimento
            </p>

            <h2 className="text-5xl md:text-7xl font-black mt-5 leading-tight">
              Excelência em funilaria e pintura automotiva.
            </h2>

            <p className="text-[#f4dfbd] text-lg mt-6 leading-8">
              Especialistas em funilaria, pintura automotiva, recuperação de
              peças, polimento e acabamento profissional.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="https://wa.me/5584991107573"
                target="_blank"
                className="bg-[#df6f2a] hover:bg-[#c95f20] transition px-6 py-4 rounded-2xl font-black"
              >
                Chamar no WhatsApp
              </a>

              <a
                href="/admin"
                className="bg-[#f4dfbd] hover:bg-white text-[#2b1a1a] transition px-6 py-4 rounded-2xl font-black"
              >
                Acompanhar Serviço
              </a>
            </div>
          </div>

          <div className="bg-[#f4dfbd] text-[#2b1a1a] rounded-3xl p-8 shadow-2xl">
            <img
              src="/logo.jpeg"
              alt="WM Funilaria & Pintura"
              className="w-full max-w-sm mx-auto rounded-3xl object-contain"
            />
          </div>
        </section>

        <section className="mt-20">
          <p className="uppercase tracking-[4px] text-[#df6f2a] font-bold text-sm">
            Serviços
          </p>

          <h3 className="text-4xl md:text-5xl font-black mt-2">
            O que fazemos
          </h3>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-[#f4dfbd] text-[#2b1a1a] rounded-3xl p-8 shadow-2xl">
              <h4 className="text-2xl font-black text-[#df6f2a]">
                Funilaria
              </h4>

              <p className="mt-4 leading-7">
                Reparos em peças, amassados e recuperação da lataria.
              </p>
            </div>

            <div className="bg-[#f4dfbd] text-[#2b1a1a] rounded-3xl p-8 shadow-2xl">
              <h4 className="text-2xl font-black text-[#df6f2a]">
                Pintura
              </h4>

              <p className="mt-4 leading-7">
                Pintura automotiva com acabamento profissional.
              </p>
            </div>

            <div className="bg-[#f4dfbd] text-[#2b1a1a] rounded-3xl p-8 shadow-2xl">
              <h4 className="text-2xl font-black text-[#df6f2a]">
                Polimento
              </h4>

              <p className="mt-4 leading-7">
                Revitalização da pintura e brilho do veículo.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20 mb-10 bg-[#f4dfbd] text-[#2b1a1a] rounded-3xl p-8 shadow-2xl">
          <h3 className="text-4xl font-black">
            Solicite seu orçamento
          </h3>

          <p className="mt-4 text-lg">
            Entre em contato com a WM Funilaria & Pintura pelo WhatsApp.
          </p>

          <a
            href="https://wa.me/5584991107573"
            target="_blank"
            className="inline-block mt-6 bg-[#df6f2a] hover:bg-[#c95f20] text-white transition px-6 py-4 rounded-2xl font-black"
          >
            Falar no WhatsApp
          </a>
        </section>
      </section>
    </main>
  )
}