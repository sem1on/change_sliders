// Получаем необходимые элементы
const slider = document.querySelector('.slider');
const before = document.querySelector('.before');
const beforeImage = before.querySelector('img');
const change = document.querySelector('.change');
const body = document.body;

// Переменная для определенияактивности слайдера
let isActive = false;

// При загрузке страници задаем первой картинке ширину всего слайдера
document.addEventListener('DOMContentLoaded', () => {
	let width = slider.offsetWidth;
	beforeImage.style.width = `${width}px`;
});

//Главная функция, запускающая все
// Х - это позиция по оси х
// Опледеляем сдвиг от 0 до конца слайдера в хависимости от Х
//находим максимальное значение от 0 до минимального значения между Х и слайдером
const beforeAfterSlider = (x) => {
	let shift = Math.max(0, Math.min(x, slider.offsetWidth));
	before.style.width = `${shift}px`;
	change.style.left = `${shift}px`;
};

//Отключает все события после скрола
const pauseEvents = (e) => {
	e.stopPropagation();
	e.preventDefault();
	return false;
};

//Проверяем что кномка мыши нажата
change.addEventListener('mousedown', () => {
	isActive = true;
});

body.addEventListener('mouseup', () => {
	isActive = false;
});

body.addEventListener('mouseleave', () => {
	isActive = false;
});

//Обработчик событий при движении мыши только когда кнопка мыши нажата
body.addEventListener('mousemove', (e) => {
	if (!isActive) {
		return;
	}
    //Задаем значени координаты мыши при движении
	let x = e.pageX;
    //Уменьшаем и перезаписываем значение left (вычитаем лишнюю облать, тк mousemove на весь body)
	x -= slider.getBoundingClientRect().left;
    //Вызываем нашу функцию от Х
	beforeAfterSlider(x);
	pauseEvents(e);
});

