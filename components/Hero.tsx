export default function Hero() {
  return (
    <section className="relative border-b border-border overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center">
          <h1 className="text-balance text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Start building in seconds
          </h1>
          <p className="text-balance text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Kickstart your next project with templates built by us and our community. Explore reusable components, full-stack starters, and learning resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="h-12 px-6 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
              View all examples
            </button>
            <button className="h-12 px-6 rounded-full border border-border hover:bg-accent transition-colors font-medium">
              Official GitHub library
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
