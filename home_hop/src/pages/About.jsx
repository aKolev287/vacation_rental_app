const About = () => {
  return (
    <div className="mb-16">
      <div className="bg-white">
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
              <span className="relative inline-block">
                <svg
                  viewBox="0 0 52 24"
                  fill="currentColor"
                  className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-gray-400 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                >
                  <defs>
                    <pattern
                      id="dc223fcc-6d72-4ebc-b4ef-abe121034d6e"
                      x="0"
                      y="0"
                      width=".135"
                      height=".30"
                    >
                      <circle cx="1" cy="1" r=".7" />
                    </pattern>
                  </defs>
                  <rect
                    fill="url(#dc223fcc-6d72-4ebc-b4ef-abe121034d6e)"
                    width="52"
                    height="24"
                  />
                </svg>
                <span className="relative">About</span>
              </span>
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              At Home Hop, we believe that every trip is an opportunity for a
              unique adventure. Whether {"you're"} seeking a cozy cabin in the
              mountains, a beachfront villa, or a city-center apartment, our
              diverse selection of vacation rentals caters to every taste and
              preference. Indulge in the freedom of choice and discover
              accommodations that resonate with your style.
            </p>
          </div>
        </div>
      </div>
      <div className="relative px-4 sm:px-0">
        <div className="absolute inset-0 bg-gray-800 h-1/2 max-sm:h-auto my-9" />
        <div className="z-20 grid grid-cols-3  grid-rows-1 max-sm:gap-5  max-sm:grid-cols-1  items-center">
          <div className="z-20  border-[1px] border-gray-300 container mx-auto p-3 bg-white max-w-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300">
            <img
              className="rounded-xl  w-full h-60 object-cover"
              src="./img-1.jpg"
              alt=""
            />
          </div>
          <div className="z-20  border-[1px] border-gray-300 container mx-auto p-3 bg-white max-w-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300">
            <img
              className="rounded-xl  w-full h-60 object-cover"
              src="./img-2.jpg"
              alt=""
            />
          </div>
          <div className="z-20  border-[1px] border-gray-300 container mx-auto p-3 bg-white max-w-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300">
            <img
              className="rounded-xl  w-full h-60 object-cover"
              src="./img-3.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
