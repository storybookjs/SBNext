import React from 'react';
import glamorous from 'glamorous';

const ZoomInIcon = () => <span>+</span>;
const ZoomOutIcon = () => <span>-</span>;
const IconButton = glamorous.button({
  width: 30,
  height: 30,
  background: 'none',
  border: '0 none',
});

const Wrapper = glamorous.div({
  display: 'flex',
  justifyContent: 'flex-end',
  position: 'absolute',
  top: 0,
  right: 0,
  left: 0,
  height: 32,
  boxSizing: 'border-box',
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  background: '#fff',
  zIndex: 2,
});

const Toolbar = ({ children, onZoomChange }) => (
  <Wrapper>
    {children}
    <IconButton onClick={() => onZoomChange(0.8)}>
      <ZoomInIcon />
    </IconButton>
    <IconButton onClick={() => onZoomChange(1.25)}>
      <ZoomOutIcon />
    </IconButton>
  </Wrapper>
);

export default Toolbar;
