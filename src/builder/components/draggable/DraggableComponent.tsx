import * as React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import './draggable-component.css';
import { Button } from 'antd';

export interface IDraggableComponent {
  name: string;
  type: string;
  draggable?: boolean;
  dropped?: boolean;
  onDragStart?: (ev: React.DragEvent<HTMLDivElement>, name: string, type: string) => void;
  onDragEnd?: (event: React.DragEvent<HTMLDivElement>, domNode: React.ReactElement, htmlElement: Element) => (void);
  component?: React.ReactElement;
  className?: string;
  showName?: boolean;
  key: string;
}
export class DraggableComponent extends React.Component<IDraggableComponent> {
  constructor(props: any) {
    super(props);

  }
  render() {
    const { name, type, draggable, dropped, onDragStart, onDragEnd, component, className, showName, key } = this.props;
    return (
      <div key={key} className={className ? className : 'draggable-component'} draggable={true} onDragEnd={(ev) => onDragEnd!(ev, component as React.ReactElement , ReactDOM.findDOMNode(this) as Element)} onDragStart={(ev) => onDragStart!(ev, name, type)}>
        {showName ? name : null}
        {component}
      </div>
    );
  }
}


