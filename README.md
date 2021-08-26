# Задача

Написать 2 виджета которые могут отобразится на странице сайта. В качестве источника данных использовать приложенный файл данных.

### Первый - виджет фильтр:

на вход может принимать данные в формате как у данных в приложенном файле. Может отрисовать набор контролов для фильтрации, задаются конфигом виджета 1 контрол => 1 колонка данных. Варианты значений для контролов формируются на основе уникальных значений соответствующих колонок данных. При изменение контролов должен фильтроваться набор данных по полученным значениям из контролов.

### Второй - виджет отображения данных.

Варианты отображения на выбор таблица или какой-то отформатированный список, внешний вид задается конфигурацией виджета. Например набор видимых колонок таблицы или шаблон элемента списка.


Обязательное условие виджеты должны умет взаимодействовать то есть виджет фильтр можно настроить так чтобы он выступал как источник данных для виджетам визуализации (все это через конфигурацию виджетов). К одному фильтру можно подключить неограниченное количество виджетов визуализации. Также и фильтров может быть несколько на странице. Виджеты визуализации должны уметь перерисовываться когда в фильтре меняются значения контролов. Также виджеты визуализации должны напрямую уметь принимать данные и просто их отображать как есть без какой либо динамики.

Запрещено использовать фреймворки и библиотеки типа React.js. Только чистый JS. Можно использовать сборщики типа webpack. Разрешенные библиотеки jQuery, underscore.js(lodash.js), moment.js. Использовать синтаксис ES6. Браузеры крайние версии Chrome, Firefox. Код выложить на любой удобный публичный репозиторий(Githab, gitlab, bitbacket)

Пример реализации



## Решение

Все зависимости в `dependencies` и `devDependencies` написаны лично мной, могу пояснить за любую строчку кода,
по этому решил что имею право это использовать, тем более когда разрешено использовать `JQuery`.
Не совсем понятно что значит виджет, если имелось ввиду `iframe` и `postMessage` то не обессудьте,
добавить их не составит больших сложностей.

## Установка

Выполнить следующую команду в директории проекта.

```shell
npm i
```

*Должен быть установлен [Node.js](https://nodejs.org/)*

# Запуск

Выполнить следующую команду в директории проекта.

```bash
npm start
```

*После запуска, в папке `public` появится папка `build` в которой вы найдете js и css файлы проекта*

## Сборка

Выполнить следующую команду в директории проекта, что бы собрать готовое и минифицированное приложение в той же папке `public`.

```bash
npm run build
```
