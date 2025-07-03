import { Container, Row, Col } from 'react-bootstrap';

const projects = [
  {
    title: 'Sales Analytics Automation (Department Hackathon Winner)',
    description:
      'Developed an AI solution to process mock sales video calls for analytics, enabling business use cases and action plans for the sales team. Won first place in the 2023 Department Hackathon.',
    technologies: ['AI', 'Analytics', 'Automation', 'React', 'Node.js'],
    illustration: null,
    link: '#',
  },
  {
    title: 'Global E-Commerce Duty & Fee Calculation',
    description:
      'Built and supported a global e-commerce system for duty and fee calculation, handling traffic of over 30 million monthly users. Integrated with global shipping partners for projected savings in the millions.',
    technologies: ['.NET Core', 'Kubernetes', 'Docker', 'SQL', 'MongoDB', 'Redis'],
    illustration: null,
    link: '#',
  },
  {
    title: 'Chatbot Platform with AI Capabilities',
    description:
      'Implemented a chatbot platform with artificial intelligence using .NET Framework and SQL Server, including web tooling for chatbots with AngularJS.',
    technologies: ['.NET Framework', 'SQL Server', 'AngularJS', 'AI'],
    illustration: null,
    link: '#',
  },
  {
    title: 'Technical Platform for Financial Professional Websites',
    description:
      'Led the technical development of a unified platform for content-based pages, tools, and identity management for financial professional websites.',
    technologies: ['.NET', 'React', 'TypeScript', 'AWS', 'Azure'],
    illustration: null,
    link: '#',
  }
];

const Projects = () => {
  return (
    <section id="projects" className="process-section">
      <Container>
        <Row className="mb-5">
          <Col className="text-center">
            <h2 className="process-title mb-4">Projects</h2>
            <p className="lead text-muted">A selection of my recent work</p>
          </Col>
        </Row>
        {projects.map((project, idx) => (
          <Row className={`align-items-center mb-5 flex-md-row${idx % 2 === 1 ? ' flex-md-row-reverse' : ''}`} key={project.title}>
            <Col md={5} className="text-center mb-4 mb-md-0">
              {project.illustration}
            </Col>
            <Col md={7}>
              <h3 className="step-title mb-3">{project.title}</h3>
              <p className="step-desc text-light">{project.description}</p>
              <div className="d-flex flex-wrap gap-2 mb-3">
                {project.technologies.map((tech, techIdx) => (
                  <span key={techIdx} className="badge bg-green-soft px-2 py-1">
                    {tech}
                  </span>
                ))}
              </div>
              {project.link && (
                <a href={project.link} className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">
                  View Project
                </a>
              )}
            </Col>
          </Row>
        ))}
      </Container>
    </section>
  );
};

export default Projects;
