// Icons.
import {
  TbBrandReact,
  TbBrandNextjs,
  TbBrandAngular,
  TbBrandVue,
  TbBrandSvelte,
} from 'react-icons/tb';

// Types.
import { IconType } from 'react-icons';
export type TechnologyT = {
  icon: IconType;
  label: string;
  value: string;
};

// Static Data.
const technologies = [
  { icon: TbBrandReact, label: 'React JS', value: 'reactjs' },
  { icon: TbBrandNextjs, label: 'Next JS', value: 'nextjs' },
  { icon: TbBrandAngular, label: 'Angular', value: 'angular' },
  { icon: TbBrandVue, label: 'Vue', value: 'vue' },
  { icon: TbBrandSvelte, label: 'Svelte', value: 'svelte' },
];

// Hook.
export default function useTechnologies() {
  const getAll = () => technologies;

  const getByValue = (value: string) => technologies.find((item) => item.value === value);

  return { getAll, getByValue };
}
