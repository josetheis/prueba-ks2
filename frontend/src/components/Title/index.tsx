interface TitleProps {
    children: string
}

export default function Title({ children }: TitleProps) {
  return (
    <h1 className="text-white text-lg font-bold align-bottom">{children}</h1>
  )
}
