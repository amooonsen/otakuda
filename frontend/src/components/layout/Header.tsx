import Image from "next/image"; // 올바른 import 경로
import ModeToggleButton from "@/components/ui/ModeToggleButton";
import Link from "next/link";

export default function Header() {
  return (
    <header id="header" className="sticky top-0 left-0 z-10 w-full transparent backdrop-blur-md">
      <div className="flex justify-between items-center h-16 px-6">
        <div className="flex gap-12">
          <Link href='/'>
            <span>Otakdua</span>
          </Link>
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
              <li>
                <Link href='/news'>News</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button>찾기</button>
          <Link href='/login'>로그인/가입</Link>
          <ModeToggleButton />
        </div>
      </div>
    </header>
  );
}
