import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Card, Container, Row, Col, Badge } from "react-bootstrap";
import CustomProgressBar from "./card/progress";

export function NewsComponent(props) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const extractTextFromHTML = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const scrapeInfoQ = async () => {
    try {
      const proxyUrl = 'https://api.allorigins.win/raw?url=';
      const response = await axios.get(`${proxyUrl}${encodeURIComponent('https://www.infoq.com/')}`);
      const parser = new DOMParser();
      const doc = parser.parseFromString(response.data, 'text/html');
      
      // InfoQ uses .cards li elements for their news items
      const articles = Array.from(doc.querySelectorAll('.cards li, .card__content, article'));
      
      return articles.map((article, index) => {
        // Look for title links in InfoQ's structure
        const titleLinkElement = article.querySelector('.card__title a, h4 a, h5 a') || 
                                article.querySelector('a[href*="/news/"], a[href*="/articles/"], a[href*="/presentations/"]');
        
        const title = titleLinkElement?.textContent?.trim() || `InfoQ Article ${index + 1}`;
        
        // Try to find description/excerpt from InfoQ
        const descElement = article.querySelector('.card__excerpt, .card__description, p, .summary, .excerpt');
        const description = descElement?.textContent?.trim() || '';
        
        let link = null;
        
        if (titleLinkElement) {
          // Get the original href attribute to avoid browser resolution
          const originalHref = titleLinkElement.getAttribute('href');
          
          if (originalHref) {
            if (originalHref.startsWith('/')) {
              // Relative URL like "/news/2025/..."
              link = `https://www.infoq.com${originalHref}`;
            } else if (originalHref.startsWith('http')) {
              // Absolute URL - check if it needs domain correction
              if (originalHref.includes('localhost')) {
                const url = new URL(originalHref);
                link = `https://www.infoq.com${url.pathname}`;
              } else {
                link = originalHref;
              }
            } else {
              // Other relative URLs
              link = `https://www.infoq.com/${originalHref}`;
            }
          }
        }
        
        if (!link) {
          return null; // Skip articles without valid links
        }
        
        return {
          title: title.substring(0, 150),
          description: description.substring(0, 250),
          url: link,
          published: new Date().toISOString(),
          source: 'InfoQ',
          author: 'InfoQ Team'
        };
      }).filter(article => article && article.title.length > 10 && article.url !== 'https://www.infoq.com/' && !article.url.includes('undefined'));
    } catch (error) {
      console.error('Error scraping InfoQ:', error);
      return [];
    }
  };

  const scrapeTechCrunch = async () => {
    try {
      const proxyUrl = 'https://api.allorigins.win/raw?url=';
      const response = await axios.get(`${proxyUrl}${encodeURIComponent('https://techcrunch.com/')}`);
      const parser = new DOMParser();
      const doc = parser.parseFromString(response.data, 'text/html');
      
      // Try multiple selectors for TechCrunch articles
      const articles = Array.from(doc.querySelectorAll('article, .post-block, .river-block, h2, h3, h1'));
      
      return articles.map((article, index) => {
        let titleLinkElement = null;
        let title = '';
        
        // Check if this is a heading element that might contain a link
        if (article.tagName && ['H1', 'H2', 'H3'].includes(article.tagName)) {
          titleLinkElement = article.querySelector('a') || article.parentElement?.querySelector('a');
          title = titleLinkElement?.textContent?.trim() || article.textContent?.trim();
        } else {
          // Check for title links in article structure
          titleLinkElement = article.querySelector('h2 a, h3 a, h1 a, .post-title a, .entry-title a') ||
                           article.querySelector('a[href*="/20"], a[href*="techcrunch.com/20"]');
          title = titleLinkElement?.textContent?.trim();
        }
        
        if (!title || title.length < 10) {
          return null;
        }
        
        // Try to find description/excerpt from TechCrunch
        const descElement = article.querySelector('.excerpt, .summary, .post-excerpt, p, .content');
        const description = descElement?.textContent?.trim() || '';
        
        let link = null;
        
        if (titleLinkElement) {
          // Get the original href attribute to avoid browser resolution
          const originalHref = titleLinkElement.getAttribute('href');
          
          if (originalHref) {
            if (originalHref.startsWith('/')) {
              // Relative URL
              link = `https://techcrunch.com${originalHref}`;
            } else if (originalHref.startsWith('http')) {
              // Absolute URL - check if it needs domain correction
              if (originalHref.includes('localhost')) {
                const url = new URL(originalHref);
                link = `https://techcrunch.com${url.pathname}`;
              } else {
                link = originalHref;
              }
            } else {
              // Other relative URLs
              link = `https://techcrunch.com/${originalHref}`;
            }
          }
        }
        
        if (!link) {
          return null; // Skip articles without valid links
        }
        
        return {
          title: title.substring(0, 150),
          description: description.substring(0, 250),
          url: link,
          published: new Date().toISOString(),
          source: 'TechCrunch',
          author: 'TechCrunch Team'
        };
      }).filter(article => article && article.title.length > 10 && article.url !== 'https://techcrunch.com/' && !article.url.includes('undefined'));
    } catch (error) {
      console.error('Error scraping TechCrunch:', error);
      return [];
    }
  };


  const scrapeArticleDescription = async (articleUrl, source) => {
    try {
      console.log(`Scraping description from: ${articleUrl}`);
      const proxyUrl = 'https://api.allorigins.win/raw?url=';
      const response = await axios.get(`${proxyUrl}${encodeURIComponent(articleUrl)}`);
      const parser = new DOMParser();
      const doc = parser.parseFromString(response.data, 'text/html');
      
      let description = '';
      
      if (source === 'InfoQ') {
        // InfoQ-specific selectors
        const infoqSelectors = [
          'meta[name="description"]',
          'meta[property="og:description"]',
          '.article__summary',
          '.article__content p:first-of-type',
          '.content p:first-of-type',
          'article p:first-of-type',
          '.article-body p:first-of-type'
        ];
        
        for (const selector of infoqSelectors) {
          const element = doc.querySelector(selector);
          if (element) {
            let text = '';
            if (element.tagName === 'META') {
              text = element.getAttribute('content') || '';
            } else {
              text = element.textContent || '';
            }
            
            if (text && text.length > 50 && !text.includes('InfoQ') && !text.includes('Latest technology')) {
              description = text.trim().substring(0, 300);
              break;
            }
          }
        }
      } else if (source === 'TechCrunch') {
        // TechCrunch-specific selectors
        const techcrunchSelectors = [
          'meta[name="description"]',
          'meta[property="og:description"]',
          '.article-content p:first-of-type',
          '.post-content p:first-of-type',
          '.entry-content p:first-of-type',
          '.wp-block-post-content p:first-of-type',
          'article .entry-content p:first-of-type'
        ];
        
        for (const selector of techcrunchSelectors) {
          const element = doc.querySelector(selector);
          if (element) {
            let text = '';
            if (element.tagName === 'META') {
              text = element.getAttribute('content') || '';
            } else {
              text = element.textContent || '';
            }
            
            if (text && text.length > 50 && !text.includes('TechCrunch') && !text.includes('Breaking technology')) {
              description = text.trim().substring(0, 300);
              break;
            }
          }
        }
      }
      
      console.log(`Found description: ${description.substring(0, 100)}...`);
      return description;
      
    } catch (error) {
      console.error(`Error scraping article description from ${articleUrl}:`, error);
      return '';
    }
  };

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        
        const [infoqNews, techcrunchNews] = await Promise.allSettled([
          scrapeInfoQ(),
          scrapeTechCrunch()
        ]);
  
        const infoqArticles = infoqNews.status === 'fulfilled' ? infoqNews.value : [];
        const techcrunchArticles = techcrunchNews.status === 'fulfilled' ? techcrunchNews.value : [];
        
        const allNews = [...infoqArticles.slice(0,25), ...techcrunchArticles.slice(0,25)];
        
        if (allNews.length > 0) {
          const shuffledNews = allNews.sort(() => 0.5 - Math.random());
          setNews(shuffledNews);
          setError(false);
          
          // Fetch descriptions for articles that need them - in parallel
          setTimeout(async () => {
            // Identify articles that need description fetching
            const articlesToUpdate = shuffledNews.filter(
              article => !article.description || article.description.length < 20
            );
            
            console.log(`Fetching descriptions for ${articlesToUpdate.length} articles`);
            
            // Fetch all descriptions in parallel
            const descriptionPromises = articlesToUpdate.map(article => 
              scrapeArticleDescription(article.url, article.source)
                .then(description => ({
                  ...article,
                  description: description || article.description
                }))
                .catch(error => {
                  console.error(`Failed to fetch description for ${article.title}:`, error);
                  return article; // Return original article if description fetch fails
                })
            );
            
            const updatedArticles = await Promise.allSettled(descriptionPromises);
            
            // Create a map of updated articles by URL for easy lookup
            const updatedArticlesMap = new Map();
            updatedArticles.forEach(result => {
              if (result.status === 'fulfilled') {
                updatedArticlesMap.set(result.value.url, result.value);
              }
            });
            
            // Merge updated articles with original news
            const finalNews = shuffledNews.map(article => 
              updatedArticlesMap.get(article.url) || article
            );
            
            setNews(finalNews);
          }, 100);
          
        } else {
          setNews([]);
          setError(true);
        }
        
      } catch (error) {
        console.error('Error fetching news:', error);
        setNews([]);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  
    fetchNews();
  }, []);

  return (
    <div className="news-page">
      <Container className="mt-0">
        <Row>
          <Col>
            <h2 className="mb-4 text-center">Latest Tech News</h2>
            <p className="text-center mb-4" style={{ color: 'white' }}>
              Live updates from InfoQ and TechCrunch - Software Engineering, Startups & Tech Trends
            </p>
          
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status" className="mb-3">
                <span className="sr-only">Loading...</span>
              </Spinner>
              <p>Scraping latest news from InfoQ and TechCrunch...</p>
              <div className="progress mb-3" style={{ height: '10px' }}>
                <CustomProgressBar />
              </div>
            </div>
          ) : error && news.length === 0 ? (
            <div className="text-center">
              <div className="alert alert-warning">
                <h5>Unable to fetch news</h5>
                <p>
                  Could not scrape articles from InfoQ and TechCrunch at this time. 
                  This may be due to CORS restrictions or site structure changes.
                </p>
                <small className="text-muted">
                  Please try refreshing the page or check back later.
                </small>
              </div>
            </div>
          ) : (
            <Row>
              {news.map((article, index) => (
                <Col md={12} key={index} className="mb-4">
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <Badge 
                            variant={article.source === 'InfoQ' ? 'info' : 'success'} 
                            className="mr-2"
                          >
                            {article.source}
                          </Badge>
                          <small className="text-muted">
                            {article.author} • {new Date(article.published).toLocaleDateString()}
                          </small>
                        </div>
                      </div>
                      <Card.Title className="h5 mb-3" style={{ textAlign: 'left' }}>
                        <a 
                          href={article.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-decoration-none"
                          style={{ color: 'black' }}
                        >
                          {article.title}
                        </a>
                      </Card.Title>
                      {article.description && article.description.length > 20 && (
                        <Card.Text style={{ textAlign: 'left', color: '#666', fontSize: '0.9rem', lineHeight: '1.4' }}>
                          {article.description}
                        </Card.Text>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
          
            <div className="text-center mt-4">
              <small style={{ color: '#ccc' }}>
                News automatically scraped from{' '}
                <a href="https://www.infoq.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#4fc3f7' }}>
                  InfoQ
                </a>{' '}
                and{' '}
                <a href="https://techcrunch.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#4fc3f7' }}>
                  TechCrunch
                </a>
              </small>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
