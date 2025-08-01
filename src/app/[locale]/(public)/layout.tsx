import { PublicFooter } from "./(components)/footer/PublicFooter"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>
      <footer><PublicFooter /></footer>
    </div>
  )
}