import Button from "../ui/Button";
import Divider from "../ui/Divider";

const Hero = () => {
  return (
    <div className="flex flex-col items-center h-screen">
      <div className="flex flex-col w-full items-end xl:px-5 px-2">
        <span className="xl:text-[36.82px] py-2 text-2xl">
          CLEAN UP, SNAP, EARN
        </span>
      </div>
      <Divider />
      <h1 className="text-4xl">DECLEANUP NETWORK</h1>
      <Divider />
      <div className="sm:px-5 px-2 w-full">
        <h2 className="text-2xl my-4">
          Empowering Cleanups. tokenizing impact
        </h2>
        <div className="w-full mb-6 flex flex-col items-center sm:gap-y-2 gap-y-1">
          <p className="xl:bg-[#FAFF00] text-center mx-auto px-2 w-fit leading-[1]">
            <span className="bg-[#FAFF00] xl:w-fit w-full px-1 text-center xl:bg-transparent">
              We mobilize people worldwide to take{" "}
            </span>
            <br className="xl:hidden" />
            <span className="bg-[#FAFF00] xl:w-fit w-full px-1 text-center xl:bg-transparent">
              meaningful environmental action
            </span>
          </p>
          <p className="text-center w-fit max-w-[88ch]">
            by transforming cleanups into measurable, onchain environmental
            commodities - called dynamic Impact Products. Through transparent
            verification, community participation, and scalable incentive
            models, we drive real-world impact that bridges local actions with
            global significance.
          </p>
        </div>
      </div>
      <Divider className="mt-16" />
      <div className="sm:px-5 px-2 mb-4  w-full">
        <Button className="hover:bg-black/80">GET STARTED</Button>
      </div>
      <Divider />
    </div>
  );
};

export default Hero;
