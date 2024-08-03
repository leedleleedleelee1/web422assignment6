import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { useRouter } from 'next/router';
import { Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import styles from '@/styles/History.module.css';
import { removeFromHistory } from '@/lib/userData';

const History = () => {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();
  
  if (!searchHistory) return null;
  
  let parsedHistory = [];
  searchHistory.forEach(h => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  const historyClicked = (e, index) => {
    router.push(`/artwork?${searchHistory[index]}`);
  };

  const removeHistoryClicked = async (e, index) => {
    e.stopPropagation();
    setSearchHistory(await removeFromHistory(searchHistory[index]));
  };

  return (
    <Row>
      <Col>
        {parsedHistory.length === 0 ? (
          <Card>
            <Card.Body>
              <Card.Title>Nothing Here</Card.Title>
              <Card.Text>Try searching for some artwork.</Card.Text>
            </Card.Body>
          </Card>
        ) : (
          <ListGroup>
            {parsedHistory.map((historyItem, index) => (
              <ListGroup.Item
                key={index}
                className={styles.historyListItem}
                onClick={(e) => historyClicked(e, index)}
              >
                {Object.keys(historyItem).map(key => (
                  <span key={key}>{key}: <strong>{historyItem[key]}</strong>&nbsp;</span>
                ))}
                <Button
                  className="float-end"
                  variant="danger"
                  size="sm"
                  onClick={(e) => removeHistoryClicked(e, index)}
                >
                  &times;
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
    </Row>
  );
};

export default History;
