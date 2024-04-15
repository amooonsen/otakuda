import {ReactNode} from "react";

type Props = { children: ReactNode, modal: ReactNode };
export default function Layout({ children, modal }: Props) {
  return (
    <div>
      카테고리 레이아웃
      {children}
      {modal}
    </div>
  )
}