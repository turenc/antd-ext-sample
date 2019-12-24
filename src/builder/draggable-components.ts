
import { IComponent, IComponentType } from './interfaces';

export const DraggableComponents: IComponent[] = [
  {
    name: 'Switch',
    type: IComponentType.SWITCH
  },
/*   {
    children: [],
    name: 'Grid',
    type: IComponentType.GRID
  }, */
  {
    name: 'Input',
    type: IComponentType.INPUT
  },
  {
    name: 'Button',
    type: IComponentType.BUTTON
  },
  {
    name: 'Wizard',
    type: IComponentType.WIZARD
  },
  {
    name: 'DateTime',
    type: IComponentType.DATETIME
  },
  {
    name: 'Upload',
    type: IComponentType.UPLOAD
  },
  {
    name: 'Responsive',
    type: IComponentType.RESPONSIVE
  },
  {
    name: 'Col',
    type: IComponentType.COL
  },
];
