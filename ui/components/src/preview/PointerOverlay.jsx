import glamorous from 'glamorous';

const PointerOverlay = glamorous.span({
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: '100%',
  height: '100%',
  zIndex: 1,
  background: 'rgba(255,255,255,0.05)',
});

export default PointerOverlay;
