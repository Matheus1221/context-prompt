import { ArrowLeftIcon } from "@radix-ui/react-icons";

export function Header() {
  return (
    <header>
      <div className="topBar">
        <div className="topItem">
          <span>
            <ArrowLeftIcon />
          </span>
        </div>
      </div>
    </header>
  );
}
