import { fromJS } from 'immutable';
import * as React from 'react';
import { Button } from 'surface-base-components';
import './builder-layout.css';
import { globalConfig } from "./config";
import { ContentBuilderComponent, DraggableComponent, DroppableComponent } from './components';
import { DraggableComponents } from './draggable-components';
import { IComponent, IComponentType, IContent } from './interfaces';
import reactElementToJSXString from 'react-element-to-jsx-string';
import { IData } from './components/content-builder/ContentBuilderComponent';
export interface IBuilderState {
  dashboardState: IContent[];
  isDragging: boolean;
  reactState: IData[];
  isDropAllowed: boolean;
  dragingElementType: string;
  dragingElementID: string;
}

const INT_LENGTH = 4;

const originalState: IContent[] = [
  {
    components: []
  },
];

export class BuilderLayout extends React.Component {

  public state: IBuilderState = {
    dashboardState: originalState,
    isDragging: false,
    reactState: [],
    isDropAllowed: false,
    dragingElementType: "",
    dragingElementID: ""
  };

  constructor(props: {}) {
    super(props);

    this.onDragStart = this.onDragStart.bind(this);
    this.onDragDrop = this.onDragDrop.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);

  }
  getComponentTree = () => {
    let content: any[] = [];
    this.state.reactState.forEach(responsive => {
      content.push(<h1>{responsive.id} </h1>);
      responsive.data.forEach((element: any) => {
       content.push(<p>{reactElementToJSXString(element)} </p>);
      });
    });
    return (content);
  }
  onChange = (arr: any) => {
    this.setState({ reactState: arr });
  }
  public render() {
    const { dashboardState } = this.state;
    return (
      <div className='builder'>
        <Button label="Debug Mode" onClick={() => { globalConfig.isDebugMode = !globalConfig.isDebugMode; this.forceUpdate(); }} type={globalConfig.isDebugMode ? 'primary' : 'secondary'}>Primary</Button>
        <div className='builder-draggables'>
          {
            DraggableComponents.map(({ name, type }: IComponent, index: number) =>
              <DraggableComponent key={`comp-${index}`}
                name={name}
                type={type}
                onDragStart={this.onDragStart}
                dropped={false}
                showName={true}
              ></DraggableComponent>
            )}
          <div className="delete_c" onDragOver={(ev: React.DragEvent<HTMLDivElement>) => { this.onDragOver(ev); }} onDrop={(event) => { this.onDragDrop2(event); }}>
            Sil
          </div>
        </div>
        <div className='builder-droppables'>
          {
            dashboardState.map(({ id, cssClass, components: contentComponents }: IContent, index: number) => (
              <ContentBuilderComponent
                key={`cb_${index}`}
                id={`cb_${index}`}
                cssClass={cssClass}
                components={contentComponents}
                onDragDrop={this.onDragDrop}
                onDragOver={(ev: React.DragEvent<HTMLDivElement>) => { this.onDragOver(ev); }}
                onChange={this.onChange}
                onDragEnd={this.onDragEnd}
              />
            )
            )}
        </div>
        <div className="reactCode">
          {this.getComponentTree()}
        </div>
      </div>
    );
  }

  private onDragStart(event: React.DragEvent<HTMLDivElement>, name: string, type: string) {

    event.dataTransfer.setData('id', name);
    event.dataTransfer.setData('type', type);
  }

  private onDragEnd(event: React.DragEvent<HTMLDivElement>, domNode: React.ReactElement, htmlElement: Element) {
    let tempstate = this.state.reactState;
    if (this.state.isDropAllowed) {
      console.log("Deleting " + this.state.dragingElementType);
    /*   if (this.state.dragingElementType === 'Responsive') {
        this.state.reactState.forEach((e, i) => {
          if (e.id === domNode.key) {
            let temp = this.state.reactState;
            temp.splice(i, 1);
            this.setState({ reactState: temp });
            htmlElement.remove();
            return;
          }
        });
      } */
        tempstate.forEach((responsive, i) => {
          responsive.data.forEach((element: any, index) => {
            if (element === domNode) {
              htmlElement.parentElement!.remove();
              tempstate[i].data.splice(i, 1);
              this.setState({ reactState: tempstate, isDropAllowed: false });
              return;
            }
          });
        });
    }
    this.setState({ reactState: tempstate, isDropAllowed: false });
  }
  private onDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }


  private onDragDrop(event: React.DragEvent<HTMLDivElement>, containerId: string) {
    const name = event.dataTransfer.getData('id');
    const type = event.dataTransfer.getData('type');
    if (type !== "Responsive") {
      alert('Componentler responsive layoutların içine bırakılmalıdır.');
      return;
    }
    const newComponent: IComponent = this.generateComponent(name, type, []);
    const containerArray: string[] = containerId.split('_');
    containerArray.shift(); // ignore first param, it is string prefix
    const componentsPath: Array<number | string> = [];
    containerArray.forEach((id: string, index: number) => {
      componentsPath.push(parseInt(id, INT_LENGTH));
      componentsPath.push(index === 0 ? 'components' : 'children');
    });
    const { dashboardState } = this.state;
    let componentState = fromJS(dashboardState);
    componentState = componentState.setIn(componentsPath, componentState.getIn(componentsPath).push(newComponent));
    this.setState({ dashboardState: componentState.toJS() });
  }
  private onDragDrop2(event: React.DragEvent<HTMLDivElement>) {
    const id = event.dataTransfer.getData('id');
    const type = event.dataTransfer.getData('type');
    this.setState({ isDropAllowed: true, dragingElementType: type, dragingElementID: id });
  }

  private generateComponent(name: string, type: string, props: []): IComponent {
    let newComponent: IComponent = {
      name,
      type,
      props
    };
    if (type === IComponentType.GRID) { // TODO - predefine this somewhere else (default props)
      const gridItem: IComponent = {
        children: [],
        name: '',
        renderProps: {
          size: 6 // <- make this configurable
        },
        type: IComponentType.GRID_ITEM
      };
      newComponent = {
        ...newComponent,
        children: [gridItem, gridItem] // <- make this configurable
      };
    }
    return newComponent;
  }

}
