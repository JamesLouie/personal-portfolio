import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer id="contact">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} className="text-center">
            <h3 className="mb-4">Get In Touch</h3>
            <p className="lead mb-5">
              I'm always interested in new opportunities and exciting projects. 
              Feel free to reach out if you'd like to work together.
            </p>
            
            <div className="mb-5">
              <a href="mailto:your.email@example.com" className="btn btn-primary btn-lg me-3 mb-2">
                Send Email
              </a>
              <a href="#projects" className="btn btn-outline-light btn-lg mb-2">
                View Projects
              </a>
            </div>
            
            <div className="social-links mb-4">
              <a href="https://github.com/JamesLouie" className="social-link me-4" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
                <span className="ms-2">GitHub</span>
              </a>
              <a href="https://linkedin.com/in/jameslouie" className="social-link me-4" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
                <span className="ms-2">LinkedIn</span>
              </a>
              <a href="https://medium.com/@JamesLouie12" className="social-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-medium"></i>
                <span className="ms-2">Medium</span>
              </a>
            </div>
            
            <div className="border-top border-secondary pt-4">
              <p className="text-muted mb-0">&copy; {new Date().getFullYear()} James Louie. All rights reserved.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
