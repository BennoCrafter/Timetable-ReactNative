export function prettifyTime(time) {
    let hours = time.getHours();
    let minutes = time.getMinutes();

    hours = (hours < 10 ? '0' : '') + hours;
    minutes = (minutes < 10 ? '0' : '') + minutes;

    return `${hours}:${minutes}`;
}
