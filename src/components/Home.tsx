import { Container, Row, Col, Button } from 'react-bootstrap';

const Home = () => {
  return (
    <Container id="home" className="text-center">
      <Row className="justify-content-center">
        <Col lg={8} md={10}>
          <div className="mb-4">
            <h1 className="display-1 fw-bold mb-4">James Louie</h1>
            <p className="lead mb-5">
              Pragmatic software leader with strong development and management skills. I approach every project with an iterative mindset and a drive to make things a little better every day.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Button variant="primary" size="lg" href="#projects">
                View My Work
              </Button>
              <Button variant="outline-light" size="lg" href="#contact">
                Get In Touch
              </Button>
            </div>
          </div>
          
          <div className="mt-5 pt-5">
            <p className="text-muted mb-3">Technologies I work with</p>
            <div className="d-flex justify-content-center gap-4 flex-wrap">
              <span className="badge bg-green-soft px-3 py-2">React</span>
              <span className="badge bg-green-soft px-3 py-2">TypeScript</span>
              <span className="badge bg-green-soft px-3 py-2">Node.js</span>
              <span className="badge bg-green-soft px-3 py-2">Python</span>
              <span className="badge bg-green-soft px-3 py-2">AWS</span>
              <span className="badge bg-green-soft px-3 py-2">Java</span>
              <span className="badge bg-green-soft px-3 py-2">Next.js</span>
              <span className="badge bg-green-soft px-3 py-2">SQL</span>
              <span className="badge bg-green-soft px-3 py-2">DynamoDB</span>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
