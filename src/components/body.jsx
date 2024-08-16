import React from "react";

const Body = () => {
  return (
    <div>
      <section className="bg-center bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            Transforma tu Futuro Financiero
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            Aprende a gestionar tus finanzas con nuestros recursos gratuitos y
            herramientas prácticas
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a
              href="#cuerpo"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
      <div>
        <section id="cuerpo" className="w-full py-8 md:py-16 lg:py-20">
          <div className="relative container max-w-md mx-auto">
            <img
              src="imagen1.jpeg"
              width="800"
              height="400"
              alt="Featured Content"
              className="w-full h-auto rounded-lg object-cover object-center"
            />
            <div className="absolute inset-0 flex flex-col items-end justify-center p-4 bg-black bg-opacity-0 hover:bg-opacity-75 transition-opacity duration-300 ease-in-out">
              <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <h2 className="text-xl font-bold tracking-tight text-white">
                  Descubre cómo la Educación Financiera Puede Transformar tu
                  Vida
                </h2>
                <br></br>
                <p className="text-white mt-2">
                  Aprender a gestionar tus finanzas es el primer paso hacia la
                  libertad financiera. Conoce los beneficios de mejorar tu
                  conocimiento financiero.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Body;
