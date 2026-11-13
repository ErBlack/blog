export const scheduled = ({ date }: { date: string }) => {
    const publishAt = Temporal.PlainDate.from(date).toZonedDateTime({ timeZone: '+01:00', plainTime: '10:00' });

    if (Temporal.Instant.compare(publishAt.toInstant(), Temporal.Now.instant()) > 0) return false;
};
