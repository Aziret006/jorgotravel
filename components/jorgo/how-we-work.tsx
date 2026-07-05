import { ClipboardList, MapPinned, PlaneTakeoff, Route } from 'lucide-react'
import { Reveal } from './reveal'

const STEPS = [
  {
    icon: ClipboardList,
    title: 'Вы оставляете заявку',
    description: 'Свяжитесь с нами удобным способом и расскажите о своих пожеланиях.',
  },
  {
    icon: Route,
    title: 'Мы подбираем маршрут',
    description: 'Составляем программу под ваш уровень, интересы и бюджет.',
  },
  {
    icon: MapPinned,
    title: 'Согласовываем детали',
    description: 'Утверждаем даты, снаряжение, проживание и все нюансы поездки.',
  },
  {
    icon: PlaneTakeoff,
    title: 'Вы отправляетесь в тур',
    description: 'Наслаждаетесь путешествием, а мы берём заботы на себя.',
  },
]

export function HowWeWork() {
  return (
    <section id="how" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">
            Как мы работаем
          </span>
          <h2 className="mt-3 text-balance font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Ваше путешествие начинается здесь
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Прозрачный процесс из четырёх простых шагов — от заявки до незабываемого
            приключения.
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* Connecting line (desktop) */}
          <div
            className="absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-primary/20 via-accent/50 to-primary/20 lg:block"
            aria-hidden="true"
          />

          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <Reveal
                  as="li"
                  key={step.title}
                  delay={i * 140}
                  className="group relative flex flex-col items-center text-center"
                >
                  <span
                    className={`relative z-10 flex size-16 items-center justify-center rounded-2xl shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:animate-pulse ${
                      i % 2 === 0
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-accent text-accent-foreground'
                    }`}
                  >
                    <Icon className="size-7" aria-hidden="true" />
                    <span className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full border-2 border-background bg-navy font-heading text-sm font-bold text-navy-foreground">
                      {i + 1}
                    </span>
                  </span>
                  <h3 className="mt-5 font-heading text-lg font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
