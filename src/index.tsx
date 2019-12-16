import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Input } from "antd";
import { Responsive, ResponsiveComponentType } from "antd-ext/src/responsive";
import "antd/dist/antd.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <>
        <div style={{ padding: 40, backgroundColor: "#f2f2f2" }}>
            <h1>FormEditor0</h1>
            <Responsive type={ResponsiveComponentType.FormStyle}>
                <Input defaultValue="FormEditor 0.1" />
                <Input defaultValue="FormEditor 0.2" />
                <Input defaultValue="FormEditor 0.3" />
                <Input defaultValue="FormEditor 0.4" />
            </Responsive>
        </div>
        <div style={{ padding: 40, backgroundColor: "#f2fff2" }}>
            <Responsive type={ResponsiveComponentType.SingleColumn}>
                <h1>SingleColumn0</h1>
                <Input defaultValue="SingleColumn 0.1" />
                <Input defaultValue="SingleColumn 0.2" />
                <Input defaultValue="SingleColumn 0.3" />
                <Input defaultValue="SingleColumn 0.4" />
            </Responsive>
        </div>
        <Responsive type={ResponsiveComponentType.DoubleColumn}>
            <div style={{ padding: 40, backgroundColor: "#f2ffff" }}>
                <Responsive type={ResponsiveComponentType.SingleColumn}>
                    <h1>SingleColumn1</h1>
                    <Input defaultValue="SingleColumn 1.1" />
                    <Input defaultValue="SingleColumn 1.2" />
                    <Input defaultValue="SingleColumn 1.3" />
                    <Input defaultValue="SingleColumn 1.4" />
                </Responsive>
                <Responsive type={ResponsiveComponentType.SingleColumn}>
                    <h1>SingleColumn2</h1>
                    <Input defaultValue="SingleColumn 2.1" />
                    <Input defaultValue="SingleColumn 2.2" />
                    <Input defaultValue="SingleColumn 2.3" />
                    <Input defaultValue="SingleColumn 2.4" />
                </Responsive>
            </div>
            <div style={{ padding: 40, backgroundColor: "#fffff2" }}>
                <h1>DoubleColumn0</h1>
                <Responsive type={ResponsiveComponentType.DoubleColumn}>
                    <Input defaultValue="DoubleColumn 0.1" />
                    <Input defaultValue="DoubleColumn 0.2" />
                    <Input defaultValue="DoubleColumn 0.3" />
                    <Input defaultValue="DoubleColumn 0.4" />
                </Responsive>
            </div>
            <div style={{ padding: 40, backgroundColor: "#fffff2" }}>
                <h1>DoubleColumn1</h1>
                <Responsive type={ResponsiveComponentType.DoubleColumn}>
                    <Input defaultValue="DoubleColumn 1.1" />
                    <Input defaultValue="DoubleColumn 1.2" />
                    <Input defaultValue="DoubleColumn 1.3" />
                    <Input defaultValue="DoubleColumn 1.4" />
                </Responsive>
            </div>
        </Responsive>
    </>
    ,
    rootElement);
