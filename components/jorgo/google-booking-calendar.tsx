const GOOGLE_CALENDAR_EMBED_SRC =
  'https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FBishkek&showPrint=0&src=YnVsYWtzYWxlLmtnQGdtYWlsLmNvbQ&src=cnUua2cub2ZmaWNpYWwjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%231BAE82&color=%23E8520A'

type GoogleBookingCalendarProps = {
  embedded?: boolean
}

export function GoogleBookingCalendar({ embedded = false }: GoogleBookingCalendarProps) {
  return (
    <div className={embedded ? '' : 'overflow-hidden rounded-2xl border border-border bg-card shadow-sm'}>
      {!embedded && (
        <div className="border-b border-border bg-secondary/50 px-4 py-3">
          <p className="text-sm font-medium text-foreground">
            Календарь доступности JorgoTravel
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Только для просмотра занятых дат — выбрать дату для брони нужно в календаре выше.
          </p>
        </div>
      )}
      <div className="relative aspect-[4/3] min-h-[360px] w-full sm:aspect-auto sm:min-h-[520px]">
        <iframe
          src={GOOGLE_CALENDAR_EMBED_SRC}
          title="Календарь туров JorgoTravel"
          className="absolute inset-0 size-full border-0"
          loading="lazy"
        />
      </div>
    </div>
  )
}
