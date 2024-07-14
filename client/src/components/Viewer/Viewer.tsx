import ReactMarkdown from 'react-markdown';

export type ViewerProps = {
  value: string;
};

export default function Viewer(props: ViewerProps) {
  return <ReactMarkdown>{props.value}</ReactMarkdown>;
}
