import { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  thumbnail?: string;
  imageUrl?: string;
  tags?: string[];
}

interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  thumbnail?: string;
  categories?: string[];
}

const BlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to format category names (kebab-case to Title Case)
  const formatCategoryName = (category: string): string => {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Using a CORS proxy to fetch Medium RSS feed
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@JamesLouie12');
        const data = await response.json();
        
        if (data.status === 'ok') {
          const processedPosts = data.items.slice(0, 3).map((post: RSSItem) => {
            // Extract image from content if available
            let imageUrl = post.thumbnail;
            
            // If no thumbnail, try to extract image from content
            if (!imageUrl && post.content) {
              const imgMatch = post.content.match(/<img[^>]+src="([^"]+)"/);
              if (imgMatch) {
                imageUrl = imgMatch[1];
              }
            }
            
            // Extract tags from categories field
            let tags: string[] = [];
            if (post.categories && post.categories.length > 0) {
              // Use the categories from the RSS feed and format them
              tags = post.categories.slice(0, 4).map(formatCategoryName); // Limit to 4 tags for clean display
            } else {
              // Fallback: use some default technical tags based on content
              const contentLower = post.content.toLowerCase();
              const defaultTags = [];
              
              if (contentLower.includes('react') || contentLower.includes('javascript')) defaultTags.push('React');
              if (contentLower.includes('typescript')) defaultTags.push('TypeScript');
              if (contentLower.includes('node') || contentLower.includes('backend')) defaultTags.push('Node.js');
              if (contentLower.includes('python')) defaultTags.push('Python');
              if (contentLower.includes('aws') || contentLower.includes('cloud')) defaultTags.push('AWS');
              if (contentLower.includes('ai') || contentLower.includes('machine learning')) defaultTags.push('AI');
              if (contentLower.includes('microservices') || contentLower.includes('architecture')) defaultTags.push('Architecture');
              if (contentLower.includes('leadership') || contentLower.includes('management')) defaultTags.push('Leadership');
              
              tags = defaultTags.slice(0, 3); // Limit to 3 tags
            }
            
            return {
              ...post,
              imageUrl,
              tags
            };
          });
          
          setPosts(processedPosts);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section id="blog" className="process-section">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="process-title mb-4">Recent Blog Posts</h2>
              <p className="lead text-muted">Loading...</p>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  return (
    <section id="blog" className="process-section">
      <Container>
        <Row className="mb-5">
          <Col className="text-center">
            <h2 className="process-title mb-4">Recent Blog Posts</h2>
            <p className="lead text-muted">Thoughts on technology and development</p>
          </Col>
        </Row>
        <Row>
          {posts.map((post, idx) => (
            <Col lg={4} md={6} className="mb-4" key={idx}>
              <Card className="blog-card h-100">
                <Card.Img 
                  variant="top" 
                  src={post.imageUrl || '/personal-portfolio/placeholder-blog.svg'} 
                  className="blog-card-img"
                  onError={(e) => {
                    // Use placeholder if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = '/personal-portfolio/placeholder-blog.svg';
                  }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="blog-title">{post.title}</Card.Title>
                  
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="blog-tags mb-3">
                      {post.tags.map((tag, tagIdx) => (
                        <span key={tagIdx} className="badge bg-green-soft me-1 mb-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="mt-auto">
                    <a 
                      href={post.link} 
                      className="btn btn-primary btn-sm"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Read More
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default BlogPosts; 