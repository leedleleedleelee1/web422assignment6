import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { Row, Col, Card } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';

const Favourites = () => {
  const [favouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) return null;

  return (
    <>
      <Row className="gy-4">
        {favouritesList.length > 0 ? (
          favouritesList.map((objectID) => (
            <Col lg={3} key={objectID}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))
        ) : (
          <Card>
            <Card.Body>
              <Card.Title>Nothing Here</Card.Title>
              <Card.Text>Try adding some new artwork to the list.</Card.Text>
            </Card.Body>
          </Card>
        )}
      </Row>
    </>
  );
};

export default Favourites;
