const now = process.env.BUILD_TIME ? Temporal.Instant.from(process.env.BUILD_TIME) : Temporal.Now.instant();

export const due = (date: string) => {
    const publishAt = Temporal.PlainDate.from(date).toZonedDateTime({ timeZone: '+01:00', plainTime: '10:00' });

    return Temporal.Instant.compare(publishAt.toInstant(), now) <= 0;
};
