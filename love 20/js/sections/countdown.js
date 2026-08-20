document.addEventListener('DOMContentLoaded', () => {
    const daysEl = document.getElementById('countDays');
    const hoursEl = document.getElementById('countHours');
    const minsEl = document.getElementById('countMins');

    function getNextAnniversary20() {
        const now = new Date();
        let next = new Date(now.getFullYear(), now.getMonth(), 20, 0, 0, 0);
        if (now.getDate() >= 20) {
            next.setMonth(next.getMonth() + 1);
        }
        return next;
    }

    function updateCountdown() {
        const now = new Date();
        const next = getNextAnniversary20();
        const diff = next - now;

        if (diff <= 0) {
            daysEl.textContent = '0';
            hoursEl.textContent = '0';
            minsEl.textContent = '0';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        daysEl.textContent = days;
        hoursEl.textContent = hours;
        minsEl.textContent = mins;
    }

    updateCountdown();
    setInterval(updateCountdown, 60000);
});
