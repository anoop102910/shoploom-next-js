import { Button } from "@/components/ui/button";

import Link from "next/link";
function Home() {
  return (
    <div className="w-full min-h-screen flex items-center justify-between">
      <div className="basis-1/2">
        <h1 className="text-5xl text-slate-600 font-bold">Unleash Your Shopping Adventure!</h1>
        <p className=" pt-5 w-[80%]">
          Welcome to our digital wonderland, where every click opens a door to delight. Dive into a
          realm where innovation meets elegance,
        </p>
        <div className="pt-6 flex gap-4">
          <Link href={"/shop"}>
            <Button>Shop now</Button>
          </Link>
          <Button variant="outline">Explore</Button>
        </div>
      </div>
      <div className="">
        <img src="hero.png" alt="" />
      </div>
      <div></div>
    </div>
  );
}
export default Home;

// <Carousel>
// <CarouselContent>
//   <CarouselItem>
//     <img src="carousel1.png" alt="" />
//   </CarouselItem>
//   <CarouselItem>
//     <img src="carousel2.png" alt="" />
//   </CarouselItem>
//   <CarouselItem>
//     <img src="carousel3.png" alt="" />
//   </CarouselItem>
// </CarouselContent>
// <CarouselPrevious />
// <CarouselNext />
// </Carousel>
