import { Popover, Tooltip, Toast, Alert } from 'bootstrap';

/**
 * Test purpose only
 * - get date
 * - get all buttons
 */
const userLocale =
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language;
const currentDate = new Date();
const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};
const readableDate = currentDate.toLocaleDateString(userLocale, dateOptions);
const buttonList = document.querySelectorAll('button');

/* Popovers */
const popoverList = document.querySelectorAll('[data-bs-toggle="popover"]');
[...popoverList].map(popover => new Popover(popover));
/* Tooltips */
const tooltipList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
[...tooltipList].map(tooltip => new Tooltip(tooltip));
/* Toasts */
const toastEl = document.getElementById('liveToast');
const toastBtn = document.getElementById('liveToastBtn');
if (toastBtn) {
  toastBtn.addEventListener('click', () => {
    const toast = new Toast(toastEl);
    return toast.show();
  });
}
/* Alerts */
const alertBtn = document.getElementById('liveAlertBtn');
const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
const createAlert = (message, type) => {
  const alertElement = document.createElement('div');
  alertElement.setAttribute('class', `alert alert-${type} fade show`);
  alertElement.setAttribute('role', 'alert');
  alertElement.innerHTML = `<span>
    <span class="rounded me-2 icon">
      <i class="bi bi-bookmark-fill"></i>
    </span>${message} <small>${alertPlaceholder.childNodes.length + 1}</small>
  </span>`;

  alertPlaceholder.append(alertElement);
};
if (alertBtn)
  alertBtn.addEventListener('click', () =>
    createAlert(`Today is ${readableDate}`, 'info')
  );
if (alertPlaceholder) {
  alertPlaceholder.addEventListener('click', e => {
    const { target } = e;
    const alertIns = Alert.getOrCreateInstance(target);
    const isAlertElm = target.classList.contains('alert');
    if (isAlertElm) {
      alertIns.close();
      target.addEventListener('closed.bs.alert', event => {
        event.preventDefault();
        buttonList[buttonList.length - 1].focus();
      });
    }
  });
}
