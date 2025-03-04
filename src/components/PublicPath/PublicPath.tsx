import React from 'react';
import { Link } from 'react-router-dom';
import './PublicPath.scss';

type Props = {
  linkName: string,
};

export const PublicPath: React.FC<Props> = ({ linkName = '' }) => {
  return (
    <div className="public-path">
      <Link to="/">
        <span className="icon icon--home" />
      </Link>

      <span className="icon icon--arrow-dis icon--next" />

      <p
        className="text text--small text--gray"
      >
        {linkName}
      </p>
    </div>
  );
};
