import * as React from 'react';

import { ContentComponent, DroppableComponent, DraggableComponent } from '../';
import { IComponent } from '../../interfaces';
import { ContentBuilderDraggableComponent } from './';

export interface IContentBuilderComponent {
  id?: string;
  cssClass?: string;
  components?: IComponent[];
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => (void);
  onDragDrop: (event: React.DragEvent<HTMLDivElement>, id: string) => (void);
  onChange?(data: IData[]): any;
  onDragEnd?: (event: React.DragEvent<HTMLDivElement>, domNode: React.ReactElement, htmlElement: Element) => (void);
}
export interface IData {
  id: string;
  data: [];
}
export interface IContentState {
  componentTree: IData[];
}

export class ContentBuilderComponent extends React.Component<IContentBuilderComponent> {
  public state: IContentState = {
    componentTree: [],
  };
  callbackFunction = (childData: any, id: any) => {
    console.log(childData);
    let isfound = false;
    let temp = this.state.componentTree;
    let data = {
      id: id,
      data: childData
    };
    temp.forEach((element, index) => {
      if (element.id === id) {
        isfound = true;
        temp[index] = data;
        this.props.onChange!(temp);
      }
    });
    if (!isfound) {
      temp.push(data);
      this.props.onChange!(temp);
    }

  }
  public render() {
    const { components, id, onDragOver, onDragDrop, onDragEnd } = this.props;
    let content = null;
    if (components) {
       content = components!.map(({ name, type, children }: IComponent, componentIndex: number) => (
        <ContentBuilderDraggableComponent
          key={`${id}_${componentIndex}`}
          id={`${id}_${componentIndex}`}
          name={name}
          type={type}
          children={children!}
          onDragOver={onDragOver}
           onDragDrop={onDragDrop}
           onDragEnd={onDragEnd}
          onUpdate={this.callbackFunction}
        />
      ));
    }
    return (
      <ContentComponent>
        {content}
        <DroppableComponent
            className="droppable-component"
            name={id!}
            onDragOver={(ev) => onDragOver(ev)}
            onDrop={(ev) => onDragDrop(ev, id!)}
            text="Responsive Layout Sürükleyin"
          />
      </ContentComponent>
    );
  }
}
