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
        <section id="cuerpo" className="bg-white dark:bg-gray-900">
          <div className="container px-6 py-10 mx-auto">
            <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
              Our Portfolio
            </h1>

            <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 lg:grid-cols-2">
              <div
                className="flex items-end h-auto overflow-hidden bg-cover rounded-lg "
                style={{
                  backgroundImage: `url('./imagen1.jpeg')`,
                }}
              >
                <div className="w-full px-8 py-4 overflow-hidden rounded-b-lg backdrop-blur-sm bg-white/60 dark:bg-gray-800/60">
                  <h2 className="mt-4 text-xl font-semibold text-gray-800 capitalize dark:text-white">
                    Best website collections
                  </h2>
                  <p className="mt-2 text-lg tracking-wider text-blue-500 uppercase dark:text-blue-400">
                    Website
                  </p>
                </div>
              </div>

              <div
                className="flex items-end overflow-hidden bg-cover rounded-lg h-96"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1621609764180-2ca554a9d6f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80')`,
                }}
              >
                <div className="w-full px-8 py-4 overflow-hidden rounded-b-lg backdrop-blur-sm bg-white/60 dark:bg-gray-800/60">
                  <h2 className="mt-4 text-xl font-semibold text-gray-800 capitalize dark:text-white">
                    Block of Ui kit collections
                  </h2>
                  <p className="mt-2 text-lg tracking-wider text-blue-500 uppercase dark:text-blue-400">
                    Ui kit
                  </p>
                </div>
              </div>

              <div
                className="flex items-end overflow-hidden bg-cover rounded-lg h-96"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')`,
                }}
              >
                <div className="w-full px-8 py-4 overflow-hidden rounded-b-lg backdrop-blur-sm bg-white/60 dark:bg-gray-800/60">
                  <h2 className="mt-4 text-xl font-semibold text-gray-800 capitalize dark:text-white">
                    Ton’s of mobile mockup
                  </h2>
                  <p className="mt-2 text-lg tracking-wider text-blue-500 uppercase dark:text-blue-400">
                    Mockups
                  </p>
                </div>
              </div>

              <div
                className="flex items-end overflow-hidden bg-cover rounded-lg h-96"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1603380353725-f8a4d39cc41e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')`,
                }}
              >
                <div className="w-full px-8 py-4 overflow-hidden rounded-b-lg backdrop-blur-sm bg-white/60 dark:bg-gray-800/60">
                  <h2 className="mt-4 text-xl font-semibold text-gray-800 capitalize dark:text-white">
                    Huge collection of animation
                  </h2>
                  <p className="mt-2 text-lg tracking-wider text-blue-500 uppercase dark:text-blue-400">
                    Animation
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
