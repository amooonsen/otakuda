import Image from "next/image"; // 올바른 import 경로
import ModeToggle from "@/components/theme-provider/ModeToggle";
import Link from "next/link";

export default function Header() {
  return (
    <header id="header">
      <div className="flex justify-between">
      <Image
        src='/svg/vercel.svg'
        alt="로고"
        width={200} // Image 컴포넌트에 width와 height 제공
        height={100}
      />
      <nav>
        <ul className="flex gap-6">
          <li>
            <Link href='/'>Main</Link>
          </li>
          <li>
            <Link href='/animation'>Anime</Link>
          </li>
          <li>
            <Link href='/manga'>Manga</Link>
          </li>
        </ul>
      </nav>
      <ModeToggle />
      </div>
    </header>
  );
}
