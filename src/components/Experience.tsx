import { Container, Row, Col } from 'react-bootstrap';

const experiences = [
  {
    company: 'Capital Group, Los Angeles, CA',
    position: 'Solution Engineer III',
    period: 'Dec 2019 - Current',
    description:
      'Led technical portfolio for content-based pages, tools, and identity management. Managed an agile team, drove product vision with partners, and initiated technical innovation. Won first place in 2023 Department Hackathon for a sales analytics solution.'
  },
  {
    company: 'iHerb, Irvine, CA',
    position: 'Software Developer II',
    period: 'Aug 2018 - Oct 2019',
    description:
      'Built distributed microservice systems for global supply chain using .NET Core, Kubernetes, Docker, and more. Supported global e-commerce duty/fee calculation and improved processes with Agile.'
  },
  {
    company: 'Tallan, Irvine, CA',
    position: 'Senior IT Consultant',
    period: 'May 2017 - Aug 2018',
    description:
      'Managed projects as Technical Project Manager, executed Agile/Scrum, and implemented Chatbot Platform with AI using .NET and SQL Server. Designed services integrating with financial APIs.'
  },
  {
    company: 'Tallan, Irvine, CA',
    position: 'IT Consultant',
    period: 'July 2015 – May 2017',
    description:
      'Delivered six successful client projects across full stack, mobile, and QA. Earned recommendation as "Easiest Staffable Consultant" by multiple directors.'
  },
  {
    company: 'Western Digital, Irvine, CA',
    position: 'Software Development Intern',
    period: 'May 2014 – Nov 2014',
    description:
      'Supported software development projects as an intern.'
  }
];

const Experience = () => {
  return (
    <section id="experience" className="timeline-section">
      <Container>
        <Row className="mb-5">
          <Col className="text-center">
            <h2 className="process-title mb-4">Experience</h2>
            <p className="lead text-muted">My professional journey</p>
          </Col>
        </Row>
        <div className="timeline">
          <div className="timeline-line" />
          {experiences.map((exp, idx) => (
            <div className="timeline-item" key={idx}>
              <div className="timeline-dot" />
              <div className="timeline-content">
                <span className="timeline-period">{exp.period}</span>
                <h3 className="timeline-title">{exp.position}</h3>
                <h4 className="timeline-company">{exp.company}</h4>
                <p className="timeline-desc">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Experience;
