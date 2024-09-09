import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { ProgressBarWrapper, ProgressLabel } from "./ProgressBar.styled";

const CenteredProgressBar = ({ progress }: { progress: number }) => {
  return (
    <ProgressBarWrapper>
      <ProgressLabel>{`${progress}%`}</ProgressLabel>
      <ProgressBar
        now={progress}
        variant="warning"
        style={{ height: '100%' }} 
      />
    </ProgressBarWrapper>
  );
};

export default CenteredProgressBar;
