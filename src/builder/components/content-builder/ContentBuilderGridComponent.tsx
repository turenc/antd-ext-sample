import * as React from 'react';

import { IComponent } from '../../interfaces/IComponent';
import { DroppableComponent } from '../droppable/DroppableComponent';
import { ContentBuilderDraggableComponent } from './ContentBuilderDraggableComponent';
import { GridComponent } from '../grid/GridComponent';
import { GridItemComponent } from '../grid-item/GridItemComponent';

export interface IContentBuilderGridComponent {
  id: string;
  children: IComponent[];
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => (void);
  onDragDrop: (event: React.DragEvent<HTMLDivElement>, id: string) => (void);
}

export const ContentBuilderGridComponent = ({
  id,
  children,
  onDragOver,
  onDragDrop
}: IContentBuilderGridComponent) => (
  <GridComponent key={id}>
    {
      children.map(({ children: gridItemChildren, renderProps }: IComponent, gridItemIndex: number) => {
        const gridId = `${id}_${gridItemIndex}`;
        return (
          <GridItemComponent key={gridId} size={renderProps!.size!}>
            {
              gridItemChildren!.map((child: IComponent, index: number) => (
                <ContentBuilderDraggableComponent
                  key={`${gridId}_${index}`}
                  id={`${gridId}_${index}`}
                  name={child.name}
                  type={child.type}
                  children={child.children!}
                  onDragOver={onDragOver}
                  onDragDrop={onDragDrop}
                />
              ))
            }
            <DroppableComponent
              name={gridId}
              onDragOver={(ev) => onDragOver(ev)}
              onDrop={(ev) => onDragDrop(ev, gridId)}
            />
          </GridItemComponent>
        );
      })}
  </GridComponent>
);
