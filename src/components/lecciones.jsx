import React, { useState } from 'react';




const Accordion = () => {
  
  const [openIndex, setOpenIndex] = useState(0);
  const fetchModulos = async () => {
    try {
      const response = await fetch("http://localhost:3000/modules/get-all-modules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const dataJson = await response.json();
      console.log(dataJson); // Verifica los datos en la consola
      setModulos(dataJson);
    } catch (error) {
      console.error("Error fetching modulos:", error);
    }
  };

  useEffect(() => {
    fetchModulos();
  }, []);


  const handleToggle = (index) => {
    // Si el panel ya está abierto, cerrarlo. Si está cerrado, abrirlo.
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="accordion-collapse" data-accordion="collapse">
      {/* Panel 1 */}
      <h2 id="accordion-collapse-heading-1">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
          onClick={() => handleToggle(1)}
          aria-expanded={openIndex === 1}
          aria-controls="accordion-collapse-body-1"
        >
          <span>What is Flowbite?</span>
          <svg
            className={`w-3 h-3 transition-transform duration-300 ${openIndex === 1 ? 'rotate-180' : ''}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id="accordion-collapse-body-1"
        className={`p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 transition-all duration-300 ${openIndex === 1 ? 'block' : 'hidden'}`}
        aria-labelledby="accordion-collapse-heading-1"
      >
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          Check out this guide to learn how to{' '}
          <a href="/docs/getting-started/introduction/" className="text-blue-600 dark:text-blue-500 hover:underline">
            get started
          </a>{' '}
          and start developing websites even faster with components on top of Tailwind CSS.
        </p>
      </div>

      {/* Panel 2 */}
      <h2 id="accordion-collapse-heading-2">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
          onClick={() => handleToggle(2)}
          aria-expanded={openIndex === 2}
          aria-controls="accordion-collapse-body-2"
        >
          <span>Is there a Figma file available?</span>
          <svg
            className={`w-3 h-3 transition-transform duration-300 ${openIndex === 2 ? 'rotate-180' : ''}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id="accordion-collapse-body-2"
        className={`p-5 border border-b-0 border-gray-200 dark:border-gray-700 transition-all duration-300 ${openIndex === 2 ? 'block' : 'hidden'}`}
        aria-labelledby="accordion-collapse-heading-2"
      >
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          Check out the{' '}
          <a href="https://flowbite.com/figma/" className="text-blue-600 dark:text-blue-500 hover:underline">
            Figma design system
          </a>{' '}
          based on the utility classes from Tailwind CSS and components from Flowbite.
        </p>
      </div>

      
      <div
        id="accordion-collapse-body-3"
        className={`p-5 border border-t-0 border-gray-200 dark:border-gray-700 transition-all duration-300 ${openIndex === 3 ? 'block' : 'hidden'}`}
        aria-labelledby="accordion-collapse-heading-3"
      >
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.
        </p>
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no technical reason stopping you from using the best of two worlds.
        </p>
        <p className="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
        <ul className="ps-5 text-gray-500 list-disc dark:text-gray-400">
          <li>
            <a href="https://flowbite.com/pro/" className="text-blue-600 dark:text-blue-500 hover:underline">
              Flowbite Pro
            </a>
          </li>
          <li>
            <a href="https://tailwindui.com/" rel="nofollow" className="text-blue-600 dark:text-blue-500 hover:underline">
              Tailwind UI
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Accordion;
