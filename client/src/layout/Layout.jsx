import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import Routers from "../routes/Routers"

const Layout = () => {
  return (
    <div>
        <Header />
        <section>
          <Routers />
        </section>
        <Footer />
    </div>
  )
}

export default Layout