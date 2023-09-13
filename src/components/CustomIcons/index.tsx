import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const MenuHeader = () => (
<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 7.5H19M5 12.5H19M5 17.5H19" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

);


export const IconMenuHeader = (props:any) => (
  <Icon component={MenuHeader} {...props} />
);

