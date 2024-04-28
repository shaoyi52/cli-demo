import { defineComponent, computed, ref } from 'vue';
import { QRCodeCanvas,qrProps } from './QrCode';

const QRCode = defineComponent({
  name:'Qrcode',
  emits: ['refresh'],
  props:qrProps(),
  setup(props, { emit, attrs, expose }) {
    const qrCodeCanvas = ref();
    expose({
      toDataURL: (type?: string, quality?: any) => {
        return qrCodeCanvas.value?.toDataURL(type, quality);
      },
    });

    const qrCodeProps = computed(() => {
      const {
        value,
        icon = '',
        size = 160,
        iconSize = 40,
        color = '#f00',
        bgColor = 'transparent',
        errorLevel = 'M',
      } = props;
      const imageSettings = {
        src: icon,
        x: undefined,
        y: undefined,
        height: iconSize,
        width: iconSize,
        excavate: true,
      };
      return {
        value,
        size: size ,
        level: errorLevel,
        bgColor,
        fgColor: color,
        imageSettings: icon ? imageSettings : undefined,
      };
    });
    return () => {
     return  <QRCodeCanvas ref={qrCodeCanvas} {...qrCodeProps.value} />
    }
  }
})

export default QRCode