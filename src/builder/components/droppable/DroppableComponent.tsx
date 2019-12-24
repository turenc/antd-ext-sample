import * as React from 'react';
import './droppable-component.css';

export interface IDroppableComponent {
  name: string;
  onDragOver: (ev: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (ev: React.DragEvent<HTMLDivElement>, componentName: string) => void;
  children?: React.ReactNode;
  text?: string;
  className?: string;
}

export const DroppableComponent = ({ name, onDragOver, onDrop, children, text, className}: IDroppableComponent) =>
  <div
    className={className}
    onDragOver={(ev: React.DragEvent<HTMLDivElement>) => onDragOver(ev)}
    onDrop={(ev: React.DragEvent<HTMLDivElement>) => onDrop(ev, name)}
    data-id={name}
  >
    <span>{text}</span>
    {children}
  </div>;
