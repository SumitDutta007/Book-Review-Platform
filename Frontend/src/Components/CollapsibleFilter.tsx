import React, { useState } from "react";
import "./CollapsibleFilter.css";

interface CollapsibleFilterProps {
  title: string;
  children: React.ReactNode;
}

const CollapsibleFilter: React.FC<CollapsibleFilterProps> = ({
  title,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="collapsible-filter">
      <div className="collapsible-header" onClick={() => setIsOpen(!isOpen)}>
        <h4 className="collapsible-title">{title}</h4>
        <span className={`collapsible-arrow ${isOpen ? "open" : ""}`}>
          &#9660;
        </span>
      </div>
      {isOpen && <div className="collapsible-content">{children}</div>}
    </div>
  );
};

export default CollapsibleFilter;
