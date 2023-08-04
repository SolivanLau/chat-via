import { FC, ReactElement } from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';

interface accordionPanelProps {
  panelNumber: number;
  panelTitle: string;
  content: ReactElement;
}
const AccordionPanel: FC<accordionPanelProps> = ({
  panelNumber,
  panelTitle,
  content,
}) => {
  return (
    <div className="accordionPanel">
      {/* CLICKABLE HEADING */}
      <h3 id={`panelHeading${panelNumber}`}>
        <button
          className="accordionTrigger"
          aria-controls={`panelContent${panelNumber}`}
          aria-expanded="true"
        >
          <span id={`panelTitle${panelNumber}`}>{panelTitle}</span>
        </button>
        <div className="accordionIconContainer">
          <RiArrowRightSLine aria-hidden="true" />
        </div>
      </h3>
      {/* ACCORDION CONTENT */}
      <div
        className="accordionContent"
        id={`panelTitle${panelNumber}`}
        aria-labelledby={`panelHeading${panelNumber}`}
        aria-hidden="true"
        role="region"
      >
        {content}
      </div>
    </div>
  );
};
export default AccordionPanel;
