import * as React from 'react';
import { globalConfig } from "../../config";
import { Button, Input, Checkbox, DatePicker, Col, Row } from 'antd';
import { IComponent } from '../../interfaces/IComponent';
import { DraggableComponent } from '../draggable/DraggableComponent';


export interface ContentBuilderDraggableComponentProps {
  id: string;
  name: string;
  type: string;
  children: IComponent[];
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => (void);
  onDragEnd?: (event: React.DragEvent<HTMLDivElement>, domNode: React.ReactElement, htmlElement: Element) => (void);
  onDragDrop: (event: React.DragEvent<HTMLDivElement>, id: string) => (void);
  onUpdate?(data: any, id: any): any;
}

export class ContentBuilderDraggableComponent extends React.Component<ContentBuilderDraggableComponentProps> {
  constructor(props: any) {
    super(props);

    this.onDragStart = this.onDragStart.bind(this);
  }
  state = {
    overlaymode: true,
    children: [] as JSX.Element[],
    realChildren: [] as JSX.Element[],
    rowJustify: 'start',
    colXs: 24,
    colSm: 24,
    colMd: 12,
    colLg: 8,
    colXl: 8,
    colXxl: 6
  };


  beforeUpload(file: File) { // For File Upload
    return true;
  }
  sendData = (id: string) => {
    this.props.onUpdate!(this.state.children, id);
  }
  private onDragStart(event: React.DragEvent<HTMLDivElement>, name: string, type: string) {
    event.dataTransfer.setData('id', name);
    event.dataTransfer.setData('type', type);
  }

  render() {
    const { id, name, type, children, onDragDrop, onDragOver } = this.props;
    let component = <div key={id}
      onDragOver={(ev: React.DragEvent<HTMLDivElement>) => onDragOver(ev)}
      onDrop={(ev: React.DragEvent<HTMLDivElement>) => this.pushToState(ev.dataTransfer.getData('type'))}
      className={globalConfig.isDebugMode ? "ResponsiveDivVisible" : "ResponsiveDivHidden"}
    >
      <Row onMouseOver={() => this.sendData(this.props.id)} >
        {/* <Col xs={this.state.colXs} sm={this.state.colSm} md={this.state.colMd} lg={this.state.colLg}
        xl={this.state.colXl} xxl={this.state.colXxl}> */}
          {this.state.realChildren}
        {/* </Col> */}
      </Row>
    </div>;

    return (
      <DraggableComponent
        key={`drag-${id}`}
        name={name}
        type={type}
        onDragStart={this.onDragStart}
        onDragEnd={this.props.onDragEnd}
        draggable={true}
        dropped={true}
        component={component}
        className='Container'
      />
    );
  }
  pushToState(type: string): void {
    const { id, name, children, onDragDrop, onDragOver } = this.props;
    let realChildren = this.state.realChildren;
    let childrens = this.state.children;
    let object = <div>{type} not implemented </div>;
    switch (type) {
      case "INPUT":
        object = <Input
          value="Test"
        >
        </Input>;
        break;
      case "SWITCH":
        object = <Checkbox
          disabled={false}
        >
        </Checkbox>;
        break;
      case "BUTTON":
        object = <Button type='primary'>Primary</Button>;
        break;
      case "DateTime":
        object = <DatePicker
          allowClear={true}
          disabled={false}
        >
        </DatePicker>;
        break;
      case "Responsive":
        alert("Nested Responsive desteklenmemektedir.");
        return;
      case "Col":
        object = <Col xs={this.state.colXs} sm={this.state.colSm} md={this.state.colMd} lg={this.state.colLg}
          xl={this.state.colXl} xxl={this.state.colXxl}>
        </Col>;
        break;
      default:
        break;
    }

    let realobject = <DraggableComponent
      key={`drag-${id}`}
      name={name}
      type={type}
      onDragStart={this.onDragStart}
      onDragEnd={this.props.onDragEnd}
      draggable={false}
      dropped={true}
      component={object}
      className='Containe2r'
    />;
    realChildren!.push(realobject);
    childrens!.push(object);
    this.setState({ children: childrens });
  }
}