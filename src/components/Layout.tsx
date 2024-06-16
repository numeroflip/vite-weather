type Props = {
  header: JSX.Element;
  footer: JSX.Element;
  main: JSX.Element;
};

export default function Layout({ header, footer, main }: Props) {
  return (
    <div className="min-h-screen flex flex-col  bg-gradient-to-tr from-pink-300 to-purple-200 ">
      <header>{header}</header>
      <main className="grow flex flex-col items-center">{main}</main>
      <footer>{footer}</footer>
    </div>
  );
}
