import Navbar from "./_components/navbar";

interface ProtectedChildren {
  children: React.ReactNode;
}

const ProtectLayout = ({ children }: ProtectedChildren) => {
  return (
    <div className="pt-10 h-full w-full flex flex-col gap-10 items-center justify-center bg-blue-300">
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectLayout;
