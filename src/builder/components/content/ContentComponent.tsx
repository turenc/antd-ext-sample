import * as React from 'react';
import './content-component.css';

export interface IContentComponent {
  children: React.ReactNode;
  className?: string;
}

export const ContentComponent = ({ children, className = '' }: IContentComponent) =>
  <div className={className}>
    <div className='content'>
      {children}
    </div>
  </div>;
