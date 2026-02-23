import {Grid,} from "@mui/material";
import FlowerCard from "./FlowerCard";
import {FlowerDto} from "../../dtos/flower.dto";

interface CardsProps {
  flowers: FlowerDto[];
  isAdmin: boolean;
}

const Cards = async ({flowers, isAdmin}: CardsProps) => {
  return (
    <Grid container spacing={3}>
      {flowers.map((flower, index) => (
          <FlowerCard
              key={index}
              flower={flower}
              isAdmin={isAdmin}
          />
        ))}
    </Grid>
  );
};

export default Cards;
