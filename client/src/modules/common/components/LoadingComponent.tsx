import React from 'react';

const LoadingComponent: React.FC = ({loading, error}: any) => {
  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  } else {
    return null;
  }
};

export default LoadingComponent;
