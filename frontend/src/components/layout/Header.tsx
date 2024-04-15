import Image from "next/image"; // 올바른 import 경로
import ModeToggleButton from "@/components/ui/ModeToggleButton";
import Link from "next/link";

export default function Header() {
  return (
    <header id="header">
      <div className="flex justify-between items-center">
        <Link href='/'>
          <span>Otakdua</span>
          {/* <Image
        src='/svg/vercel.svg'
        alt="로고"
        width={200} // Image 컴포넌트에 width와 height 제공
        height={100}
         /> */}
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
        <div className="flex items-center gap-4">
          <button>찾기</button>
          <Link href='/login'>로그인/가입</Link>
          <ModeToggleButton />
        </div>
      </div>
    </header>
  );
}
