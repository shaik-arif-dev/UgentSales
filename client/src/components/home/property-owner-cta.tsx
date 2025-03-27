import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function PropertyOwnerCTA() {
  return (
    <section className="py-8 border-b">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4 mt-14">
            <div className="border-t border-gray-300 flex-grow w-1/5"></div>
            <h2 className="text-xl font-normal text-gray-900 mx-4">
              <span className="text-xl max-sm:text-xs max-sm:text-[10px]">
                Sell your Property
              </span>{" "}
              <span className="font-['Dancing_Script',_cursive] text-[30px] max-sm:text-[20px] italic text-[#bb1824] inline-block relative">
                Super Fast
                <span className="absolute bottom-[-5px] left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#bb1824] to-[#bb1824] after:content-[''] after:absolute after:right-[-5px] after:bottom-[-5px] after:border-t-[6px] after:border-r-[0px] after:border-b-[0px] after:border-l-[10px] after:border-t-transparent after:border-l-[#bb1824]"></span>
              </span>
            </h2>
            <div className="border-t border-gray-800 flex-grow w-1/5"></div>
          </div>
          <Button
            asChild
            variant="primary"
            size="lg"
            className="bg-blue-800 hover:bg-blue-800"
          >
            <Link
              href="/add-property"
              onClick={() => window.scrollTo(0, 0)}
              className="text-white font-medium"
            >
              Post Property Free
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
