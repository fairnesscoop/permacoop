import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';

export function makeMonthUrl(resolver: RouteNameResolver, date: Date): string {
  const url = resolver.resolve('faircalendar_index');

  const params = new URLSearchParams({
    month: (date.getMonth() + 1).toString(),
    year: date.getFullYear().toString()
  });

  return url + '?' + params.toString();
}
