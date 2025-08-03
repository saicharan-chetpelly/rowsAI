import React from 'react';
import DeepdiveCard from 'components/organisms/DeepdiveCard';
import { Deepdive } from 'utils/types';
import Typography from 'components/atoms/Typography';
import theme from 'theme';
import Container from './styled';

interface IDeepdivesProps {
  data: Deepdive[];
}
const Deepdives = ({ data }: IDeepdivesProps) => {
  const handleDeepdiveClick = (deepdiveId: string, menuItemId: string) => {};
  return (
    <Container>
      <Typography
        variant="subtitle1"
        color={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}>
        Deep dives
      </Typography>
      {data.map((deepdive) => (
        <DeepdiveCard
          key={deepdive.deepdiveId}
          startIconSrc={deepdive.iconSrc}
          startIconAlt={deepdive.iconAlt}
          label={deepdive.label}
          deepdiveId={deepdive.deepdiveId}
          onDeepdiveMenuItemClick={handleDeepdiveClick}
          query={deepdive.query}
          deepdiveName={deepdive.deepdiveName}
        />
      ))}
    </Container>
  );
};

export default Deepdives;
