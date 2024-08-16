// eslint-disable-next-line no-unused-vars
import React from "react";
import "../App.css";

const Body = () => {
  return (
    <div>
      <section className="relative w-full h-screen bg-center bg-no-repeat bg-cover bg-[url('./inicio.jpeg')] bg-gray-700 bg-blend-multiply">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl transition-transform duration-500 ease-in-out transform hover:scale-105 hover:text-gray-300">
            Transforma tu Futuro Financiero
          </h1>
          <p className="mb-8 text-4xl font-extrabold tracking-tight leading-none text-white md:text-3xl lg:text-2xl transition-transform duration-500 ease-in-out transform hover:scale-105 hover:text-gray-300">
            Aprende a gestionar tus finanzas con nuestros recursos gratuitos y
            herramientas prácticas
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a
              href="#cuerpo"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 
              transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              Comienza Ya
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  // eslint-disable-next-line react/no-unknown-property
                  stroke-linecap="round"
                  // eslint-disable-next-line react/no-unknown-property
                  stroke-linejoin="round"
                  // eslint-disable-next-line react/no-unknown-property
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
      <section id="cuerpo" className="bg-white dark:bg-gray-900">
        <div className=" text-center">
          <div className="max-w-3xl mx-auto space-y-4">

            <h1 className="text-4xl text-center font-extrabold tracking-tight text-gray-700 sm:text-5xl md:text-6xl hover:text-sky-400 transition-all duration-500 transform hover:-translate-y-1 hover:scale-105">
              Descubre cómo la Educación Financiera Puede Transformar tu Vida
            </h1>
            <p className="text-3xl font-semibold tracking-tight text-white md:text-2xl lg:text-xl transition-all duration-500 transform hover:translate-x-1 hover:text-gray-400">
              Aprender a gestionar tus finanzas es el primer paso hacia la
              libertad financiera. Conoce los beneficios de mejorar tu
              conocimiento financiero.
            </p>
          </div>
        </div>
      </section>
      <div>
        <section className="bg-white dark:bg-gray-900">
          <div className="container px-6 py-10 mx-auto">
            <h1 className="text-4xl font-bold tracking-tighter text-gray-500 sm:text-5xl md:text-6xl hover:text-sky-200 transition-colors duration-300">
              Nuestros Beneficios
            </h1>
            <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 lg:grid-cols-2">
              <div
                className="relative flex items-end h-auto overflow-hidden bg-cover rounded-lg group"
                style={{
                  backgroundImage: `url('./imagen1.jpeg')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h2 className="text-xl font-semibold text-white capitalize dark:text-white">
                    Mejora tu Salud Financiera
                  </h2>
                  <p className="mt-2 text-sm tracking-wider text-white  dark:text-white">
                    Aprender sobre finanzas personales te permite identificar y
                    corregir malos hábitos financieros. Podrás crear un
                    presupuesto que funcione para ti, controlar tus gastos, y
                    comenzar a ahorrar de manera efectiva.
                  </p>
                </div>
              </div>
              <div
                className="relative flex items-end overflow-hidden bg-cover rounded-lg h-96 group"
                style={{
                  backgroundImage: `url('./imagen2.jpeg')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300"></div>

                <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h2 className="text-xl font-semibold text-gray-800 capitalize dark:text-white">
                    Toma el Control de tus Deudas
                  </h2>
                  <p className="mt-2 text-sm tracking-wider text-white  dark:text-white">
                    Con una sólida educación financiera, podrás desarrollar
                    estrategias para pagar tus deudas más rápidamente, reducir
                    intereses y evitar caer en ciclos de deuda
                  </p>
                </div>
              </div>
              <div
                className="relative flex items-end overflow-hidden bg-cover rounded-lg h-96 group"
                style={{
                  backgroundImage: `url('./imagen3.jpeg')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300"></div>

                <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h2 className="text-xl font-semibold text-gray-800 capitalize dark:text-white">
                    Planea para el Futuro
                  </h2>
                  <p className="mt-2 text-sm tracking-wider text-white  dark:text-white">
                    La planificación financiera te permite ahorrar para metas a
                    largo plazo como la compra de una casa, la educación de tus
                    hijos, o tu jubilación. Con una planificación adecuada,
                    puedes asegurar un futuro financiero estable.
                  </p>
                </div>
              </div>
              <div
                className="relative flex items-end overflow-hidden bg-cover rounded-lg h-96 group"
                style={{
                  backgroundImage: `url('./imagen5.jpeg')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300"></div>

                <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h2 className="text-xl font-semibold text-gray-800 capitalize dark:text-white">
                    Aumenta tu Confianza Financiera
                  </h2>
                  <p className="mt-2 text-sm tracking-wider text-white  dark:text-white">
                    A medida que adquieres conocimientos financieros, tu
                    confianza para tomar decisiones financieras inteligentes
                    crecerá, lo que te permitirá tomar el control de tu vida
                    económica.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Body;
