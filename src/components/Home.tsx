import { Container, Row, Col } from 'react-bootstrap';
import { Typewriter } from 'react-simple-typewriter';

const Home = () => {
  return (
    <Container id="home" className="text-center">
      <Row className="justify-content-center">
        <Col lg={8} md={10}>
          <div className="mb-4">
            <h1 className="display-1 fw-bold mb-4">
              <Typewriter
                words={['James Louie']}
                cursor
                cursorStyle="_"
                typeSpeed={90}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h1>
            <p className="lead mb-5">
              Pragmatic software leader with strong development and management skills. I approach every project with an iterative mindset and a drive to make things a little better every day.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
