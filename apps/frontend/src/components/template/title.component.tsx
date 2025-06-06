export interface TitleProps {
  title: string;
  subtitle?: string;
  icon?: any;
  className?: string;
}

export default function Title(props: TitleProps) {
  return (
    <div className="flex items-center gap-2">
      {props.icon && <props.icon size={50} stroke={1} />}
      <div className="flex flex-col">
        <h1 className="text-2xl text-zinc-200">{props.title}</h1>
        {props.subtitle && (
          <p className="text-sm text-zinc-400">{props.subtitle}</p>
        )}
      </div>
    </div>
  );
}
