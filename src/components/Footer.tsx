import Link from "./Link";

export default function Footer() {
  return (
    <footer className="bg-white w-full shadow-lg py-5 px-10 text-center">
      <div>
        Made with <span className="text-red-600">love</span> by{" "}
        <Link href="https://github.com/numeroflip">numeroflip</Link>
      </div>
    </footer>
  );
}
