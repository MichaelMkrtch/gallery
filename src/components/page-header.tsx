type PageHeaderProps = {
  title: string;
  description: string;
};

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-8 pt-4">
      <h2 className="text-primary mb-1 text-3xl tracking-tighter">{title}</h2>
      <span className="text-xl">{description}</span>
    </div>
  );
}
