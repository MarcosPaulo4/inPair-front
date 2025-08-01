import { PrivateHeader } from "./(components)/Header/PrivateHeader"

export default function PrivateLayout({
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
      <header><PrivateHeader /></header>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>
    </div>
  )
}