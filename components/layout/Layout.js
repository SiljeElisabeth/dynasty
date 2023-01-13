import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <div className="layout-container">{children}</div>
      <Footer />
    </>
  );
}
