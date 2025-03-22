import { Helmet } from "react-helmet";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ title, children }) {
  return (
    <div>
      <Helmet>
        <title>{title || "Edustage Education"}</title>
        <link rel="icon" href="/img/favicon.png" type="image/png" />
        <link rel="stylesheet" href="/css/bootstrap.css" />
        <link rel="stylesheet" href="/css/flaticon.css" />
        <link rel="stylesheet" href="/css/themify-icons.css" />
        <link rel="stylesheet" href="/vendors/owl-carousel/owl.carousel.min.css" />
        <link rel="stylesheet" href="/vendors/nice-select/css/nice-select.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/faq.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </Helmet>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <Footer />

      {/* Scripts */}
      <script src="/js/jquery-3.2.1.min.js"></script>
      <script src="/js/popper.js"></script>
      <script src="/js/bootstrap.min.js"></script>
      <script src="/vendors/nice-select/js/jquery.nice-select.min.js"></script>
      <script src="/vendors/owl-carousel/owl.carousel.min.js"></script>
      <script src="/js/owl-carousel-thumb.min.js"></script>
      <script src="/js/jquery.ajaxchimp.min.js"></script>
      <script src="/js/mail-script.js"></script>
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCjCGmQ0Uq4exrzdcL6rvxywDDOvfAu6eE"></script>
      <script src="/js/gmaps.min.js"></script>
      <script src="/js/theme.js"></script>
    </div>
  );
}

export default Layout;
