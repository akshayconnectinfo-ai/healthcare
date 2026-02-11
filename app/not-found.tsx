import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex h-screen max-h-screen flex-col items-center justify-center px-[5%]">
      <Image
        src="/assets/icons/logo-full.svg"
        height={1000}
        width={1000}
        alt="logo"
        className="mb-8 h-10 w-fit"
      />
      <h2 className="header mb-6 max-w-[600px] text-center">Page Not Found</h2>
      <p className="text-dark-700 mb-8">
        The page you are looking for doesn&apos;t exist.
      </p>
      <Link href="/" className="text-green-500">
        Return Home
      </Link>
    </div>
  );
}
