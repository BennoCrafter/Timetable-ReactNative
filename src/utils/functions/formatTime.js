export const formatTime = (timeString) => {
    let [hours, minutes] = timeString.split(':').map(Number);

    return new Date().setHours(hours, minutes, 0, 0);
}