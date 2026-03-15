import brand from "../../assets/brand-image.png";
import { Input } from "../ui/input";

export function Header() {
  return (
    <header className="w-full max-[1200px] mx-auto bg-transparent flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <div className="">
          <img className="h-24" src={brand} alt="Brand Logo" />
        </div>
        <div>
          <Input placeholder="Search"></Input>
        </div>
        <h1 className="text-2xl font-bold bg-black">Header</h1>
      </div>
    </header>
  );
}
