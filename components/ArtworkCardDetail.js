import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { addToFavourites, removeFromFavourites } from '@/lib/userData';
import { Card, Button } from 'react-bootstrap';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkCardDetail({ objectID }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`, fetcher);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList, objectID]);

  const favouritesClicked = async () => {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(objectID));
    } else {
      setFavouritesList(await addToFavourites(objectID));
    }
    setShowAdded(!showAdded);
  };

  if (error) return <div>Error loading artwork details</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Card>
      {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}
      <Card.Body>
        <Card.Title>{data.title || "N/A"}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {data.objectDate || "N/A"}<br />
          <strong>Classification:</strong> {data.classification || "N/A"}<br />
          <strong>Medium:</strong> {data.medium || "N/A"}<br />
          <strong>Artist:</strong> {data.artistDisplayName || "N/A"}<br />
          <Button variant={showAdded ? "primary" : "outline-primary"} onClick={favouritesClicked}>
            {showAdded ? "Remove from Favourites" : "Add to Favourites"}
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
