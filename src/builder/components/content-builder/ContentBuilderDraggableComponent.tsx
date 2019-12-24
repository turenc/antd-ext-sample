import { Button, TextBox, TextBoxComponentType, CheckBox, CheckBoxComponentType, Responsive, ResponsiveComponentType, Divider, Col, Wizard, Step, WizardComponentType, DateTime, DateTimeComponentType, DatePickerOptions, Upload, UploadComponentType } from 'surface-base-components';
import * as React from 'react';
import { DraggableComponent } from '../';
import { IComponent, IComponentType } from '../../interfaces';
import { ContentBuilderGridComponent } from './';
import { globalConfig } from "../../config";


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
const buttonStepList: Step[] = [
  {
    key: 0,
    label: 'Example 1',
    description: 'example 1',
    subStepCount: 3
  },
  {
    key: 1,
    label: 'Example 2',
    description: 'example 2',
    subStepCount: 2
  },
  {
    key: 2,
    label: 'Example 3',
    description: 'example 3'
  },
  {
    key: 3,
    label: 'Example 4',
    description: 'example 4',
    subStepCount: 2
  },
  {
    key: 4,
    label: 'Example 5',
    description: 'example 5',
    subStepCount: 2
  }

];

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
      <Responsive onMouseOver={() => this.sendData(this.props.id)} type={ResponsiveComponentType.FourColumn}>
        {this.state.realChildren}
      </Responsive>
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
        object = <TextBox
          changeMode='onKeyDown'
          onPressEnter={(e) => alert("Press Enter Event ")}
          floatLabel
          visible={true}
          label="Customer Name"
          componentType={TextBoxComponentType.Input}
          value="Test"
          onChangeValue={(e) => alert("Value Change Event")}
          suffixText={"VKN Sorgulama"}
          onSuffixClick={() => alert("Suffix Clicked")}
        >
        </TextBox>;
        break;
      case "SWITCH":
        object = <CheckBox
          checkedChildren="Aktif"
          unCheckedChildren="Pasif"
          disabled={false}
          componentType={CheckBoxComponentType.Switch}
        >
        </CheckBox>;
        break;
      case "BUTTON":
        object = <Button label="Test" type='primary'>Primary</Button>;
        break;
      case "Wizard":
        object = <Wizard buttonAddition
          type={WizardComponentType.BasicType}
          stepList={buttonStepList}
        />;
        break;
      case "DateTime":
        object = <DateTime
          isStyleActive
          label="Date Time"
          componentType={DateTimeComponentType.DatePicker}
          placeHolder="Please Enter"
          options={new DatePickerOptions({ format: "DD-MM-YYYY HH:mm:ss", showToday: true, showTime: true })}
          size="default"
          allowClear={true}
          disabled={false}
        >
        </DateTime>;
        break;
      case "Upload":
        object = <Upload
          description="Dosya Yükle - Basic"
          beforeUpload={this.beforeUpload }
          componentType={UploadComponentType.button}
          listType="text"
          multiple={true}
        />;
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