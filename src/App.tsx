import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Experience from './components/Experience';
import Projects from './components/Projects';
import BlogPosts from './components/BlogPosts';
import Footer from './components/Footer';
import Navigation from './components/Navigation';

function App() {
  return (
    <>
      <Header />
      <Home />
      <Experience />
      <Projects />
      <BlogPosts />
      <Footer />
      <Navigation />
    </>
  );
}

export default App;