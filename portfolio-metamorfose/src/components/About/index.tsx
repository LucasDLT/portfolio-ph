import Image from "next/image";

export const AboutComponent = () => {
  return (
    <div id="conoceme" className="h-[100vh] flex justify-between items-center  ">
      <div className="flex flex-col w-full ">
        <section className="text-white text-center h-full w-[50rem] flex items-center">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis est ab ut minima similique amet quas sunt blanditiis,
            architecto consectetur sapiente labore dignissimos esse. Id beatae
            autem ex cupiditate laudantium. Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Ea molestias dolore earum praesentium
            expedita illum quae culpa provident ab id nulla, molestiae,
            repudiandae magni voluptatibus minus? Facilis pariatur adipisci
            consequatur.
          </p>
        </section>

        <section className="flex justify-center items-center gap-1">
          <div className="z-[1] mask-fade w-[15rem]  h-[20rem] flex items-center overflow-hidden transition-all duration-300 ease-in-out hover:cursor-pointer  hover:blur-xs">
            <Image
              src="/about-image.jpeg"
              alt="metamorfose-fondo"
              width={2500}
              height={2500}
              className="object-cover w-full h-full z-[-1] mask-fade border-2 border-white"
            />
          </div>
          <div className="z-[1] mask-fade w-[15rem]  h-[20rem] flex items-center overflow-hidden transition-all duration-300 ease-in-out hover:cursor-pointer  hover:blur-xs">
            <Image
              src="/about-image.jpeg"
              alt="metamorfose-fondo"
              width={2500}
              height={2500}
              className="object-cover w-full h-full z-[-1] mask-fade border-2 border-white"
            />
          </div>
          <div className="z-[1] mask-fade w-[15rem]  h-[20rem] flex items-center overflow-hidden transition-all duration-300 ease-in-out hover:cursor-pointer  hover:blur-xs">
            <Image
              src="/about-image.jpeg"
              alt="metamorfose-fondo"
              width={2500}
              height={2500}
              className="object-cover w-full h-full z-[-1] mask-fade border-2 border-white "
            />
          </div>
        </section>
      </div>

      <div className="z-[-1] mask-fade w-[40rem]  h-[40rem] flex items-center overflow-hidden mr-70">
        <Image
          src="/about-image.jpeg"
          alt="metamorfose-fondo"
          width={2500}
          height={2500}
          className="object-cover w-full h-full z-[-1] mask-fade border-2 border-white grayscale"
        />
      </div>
    </div>
  );
};
