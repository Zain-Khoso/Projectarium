// Icons.
import {
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiVuedotjs,
  SiSvelte,
  SiExpress,
  SiNestjs,
  SiDjango,
  SiFlask,
  SiFastapi,
  SiSpringboot,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiCsharp,
  SiRuby,
  SiPhp,
  SiGo,
  SiRust,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiSqlite,
  SiFirebase,
  SiTailwindcss,
  SiBootstrap,
  SiBulma,
  SiChakraui,
  SiGit,
  SiGithub,
  SiDocker,
  SiKubernetes,
  SiVercel,
  SiNetlify,
  SiAwsamplify,
  SiJest,
  SiCypress,
  SiSelenium,
  SiGraphql,
  SiWebpack,
  SiBabel,
  SiEslint,
} from 'react-icons/si';

// Types.
import { IconType } from 'react-icons';

// Types.
export type TechnologyT = {
  icon: IconType;
  label: string;
  value: string;
};

// Static Data.
const technologies = [
  { icon: SiReact, label: 'React', value: 'react' },
  { icon: SiNextdotjs, label: 'Next', value: 'next' },
  { icon: SiAngular, label: 'Angular', value: 'angular' },
  { icon: SiVuedotjs, label: 'Vue', value: 'vue' },
  { icon: SiSvelte, label: 'Svelte', value: 'svelte' },
  { icon: SiExpress, label: 'Express', value: 'express' },
  { icon: SiNestjs, label: 'Nestjs', value: 'nestjs' },
  { icon: SiSpringboot, label: 'Springboot', value: 'springboot' },
  { icon: SiDjango, label: 'Django', value: 'django' },
  { icon: SiFlask, label: 'Flask', value: 'flask' },
  { icon: SiFastapi, label: 'FastAPI', value: 'fastapi' },
  { icon: SiPython, label: 'Python', value: 'python' },
  { icon: SiJavascript, label: 'Javascript', value: 'javascript' },
  { icon: SiTypescript, label: 'Typescript', value: 'typescript' },
  { icon: SiRuby, label: 'Ruby', value: 'ruby' },
  { icon: SiPhp, label: 'PHP', value: 'php' },
  { icon: SiCsharp, label: 'C #', value: 'csharp' },
  { icon: SiGo, label: 'Go', value: 'go' },
  { icon: SiRust, label: 'Rust', value: 'rust' },
  { icon: SiMongodb, label: 'Mongodb', value: 'mongodb' },
  { icon: SiMysql, label: 'MySQL', value: 'mysql' },
  { icon: SiPostgresql, label: 'PostgreSQL', value: 'postgresql' },
  { icon: SiFirebase, label: 'Firebase', value: 'firebase' },
  { icon: SiSqlite, label: 'Sqlite', value: 'sqlite' },
  { icon: SiTailwindcss, label: 'Tailwindcss', value: 'tailwindcss' },
  { icon: SiBulma, label: 'Bulma', value: 'bulma' },
  { icon: SiChakraui, label: 'Chakraui', value: 'chakraui' },
  { icon: SiBootstrap, label: 'Bootstrap', value: 'bootstrap' },
  { icon: SiGit, label: 'Git', value: 'git' },
  { icon: SiGithub, label: 'Github', value: 'github' },
  { icon: SiDocker, label: 'Docker', value: 'docker' },
  { icon: SiKubernetes, label: 'Kubernetes', value: 'kubernetes' },
  { icon: SiNetlify, label: 'Netlify', value: 'netlify' },
  { icon: SiVercel, label: 'Vercel', value: 'vercel' },
  { icon: SiAwsamplify, label: 'AWS', value: 'aws' },
  { icon: SiJest, label: 'Jest', value: 'jest' },
  { icon: SiCypress, label: 'Cypress', value: 'cypress' },
  { icon: SiSelenium, label: 'Selenium', value: 'selenium' },
  { icon: SiGraphql, label: 'Graphql', value: 'graphql' },
  { icon: SiWebpack, label: 'Webpack', value: 'webpack' },
  { icon: SiBabel, label: 'Babel', value: 'babel' },
  { icon: SiEslint, label: 'Eslint', value: 'eslint' },
];

// Hook.
export default function useTechnologies() {
  const getAll = () => technologies;

  const getByValue = (value: string) => technologies.find((item) => item.value === value);

  return { getAll, getByValue };
}
