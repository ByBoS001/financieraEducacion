// eslint-disable-next-line no-unused-vars
import React from "react";

export default function Nosotros() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Sobre Nosotros
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl lg:text-base xl:text-xl">
              Nuestro equipo está formado por estudiantes apasionados y
              dedicados de la Universidad Internacional del Ecuador, quienes han
              trabajado arduamente en este proyecto como parte de la materia de
              Programación Web. Aunque somos estudiantes en formación, nos hemos
              comprometido a brindar soluciones innovadoras y de calidad,
              poniendo en práctica todo lo aprendido en nuestras clases y con el
              objetivo de ofrecer resultados excepcionales.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col items-center justify-center space-y-4">
            <img
              src="/perfil1.jpg"
              width={200}
              height={200}
              alt="Foto de perfil"
              className="rounded-full object-cover"
              style={{ aspectRatio: "1/1", objectFit: "cover" }}
            />
            <div className="grid gap-1 text-center">
              <h3 className="text-xl font-bold">Martin Andrade</h3>
              <p className="text-muted-foreground">Estudiante</p>
              <p className="text-sm text-muted-foreground">
                Martín es un estudiante apasionado por el baloncesto y la
                carrera de Tecnología de la Información. Con su dedicación y
                entusiasmo, lidera al equipo con visión, impulsando la
                creatividad y el aprendizaje continuo. Bajo su guía, hemos
                logrado desarrollar proyectos innovadores que reflejan su
                compromiso tanto con el deporte como con su formación académica.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4">
            <img
              src="/perfil3.png"
              width={200}
              height={200}
              alt="Foto de perfil"
              className="rounded-full object-cover"
              style={{ aspectRatio: "1/1", objectFit: "cover" }}
            />
            <div className="grid gap-1 text-center">
              <h3 className="text-xl font-bold">Bruno Ortega</h3>
              <p className="text-muted-foreground">Estudiante</p>
              <p className="text-sm text-muted-foreground">
                Bruno es un estudiante apasionado por el fútbol y el diseño de
                experiencia de usuario. Le encanta crear productos digitales y
                se asegura de que nuestras ideas se conviertan en algo que
                realmente guste a la gente. Gracias a su dirección, hemos
                lanzado proyectos que han sido bien recibidos por todos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
