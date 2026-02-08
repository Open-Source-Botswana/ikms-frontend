interface HeroProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  breadcrumb?: React.ReactNode;
  height?: 'full' | 'large' | 'medium';
}

const heightClasses = {
  full: 'min-h-screen',
  large: 'min-h-[70vh]',
  medium: 'min-h-[50vh]',
};

export function Hero({
  title,
  subtitle,
  backgroundImage,
  breadcrumb,
  height = 'full',
}: HeroProps) {
  return (
    <section className={`relative ${heightClasses[height]} flex items-center`}>

      <div className="absolute inset-0 z-0 ">
        <img
          src={backgroundImage}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'var(--hero-overlay)' }}
        />
      </div>


      <div className="relative z-10 container mx-auto px-4 pt-16">
        <div className="max-w-3xl animate-fade-in">
          {breadcrumb && <div className="mb-6 text-white ">{breadcrumb}</div>}

          <div className="w-[550px] h-[1px] bg-slate-300 mb-6" />

          <h1 className="hero-title text-foreground mb-4 text-white">
            {title}
          </h1>

          <div className="w-[550px] h-[1px] bg-slate-300 mb-6" />

          {subtitle && <p className="hero-subtitle text-white">{subtitle}</p>}
        </div>
      </div>
    </section>
  );
}
